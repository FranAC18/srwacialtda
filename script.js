/**
 * Script para renderizar datos a partir del objeto global 'cardData' ubicado en data.js.
 * Esto mantiene un archivo general donde el html toma sus campos dinamicamente, permitiendo modificar datos en un solo lugar.
 */

function populateDOM() {
    // 1. Cabecera (Metadata)
    document.getElementById('page-title').textContent = `${cardData.profile.name} - Tarjeta Digital`;
    document.getElementById('page-desc').content = `Tarjeta de presentación digital de ${cardData.profile.name}`;

    // 2. Información del Perfil
    const profileImg = document.getElementById('profile-image');
    profileImg.src = cardData.profile.image;

    // Fallback si la imagen no se ha subido/encontrado
    profileImg.onerror = function () {
        this.src = cardData.profile.fallbackImage;
        document.getElementById('profile-blur').style.backgroundImage = `url(${cardData.profile.fallbackImage})`;
    };

    // Establecer el efecto blur del fondo utilizando la misma imagen
    document.getElementById('profile-blur').style.backgroundImage = `url(${cardData.profile.image})`;

    document.getElementById('profile-name').textContent = cardData.profile.name;
    document.getElementById('profile-title').textContent = cardData.profile.title;
    document.getElementById('profile-description').textContent = cardData.profile.description;

    // 3. Acciones Rápidas
    const quickActionsContainer = document.getElementById('quick-actions');
    const waUrl = `https://wa.me/${cardData.contact.phone}?text=${encodeURIComponent(cardData.contact.whatsappMessage)}`;
    const telUrl = `tel:+${cardData.contact.phone}`;
    const mailUrl = `mailto:${cardData.contact.email}`;
    const webUrl = cardData.contact.url.startsWith('http') ? cardData.contact.url : `https://${cardData.contact.url}`;

    quickActionsContainer.innerHTML = `
        <a href="${waUrl}" target="_blank" class="action-btn" aria-label="WhatsApp">
            <i data-lucide="message-circle" class="icon"></i>
        </a>
        <a href="${telUrl}" class="action-btn" aria-label="Llamar a ${cardData.profile.name}">
            <i data-lucide="phone" class="icon"></i>
        </a>
        <a href="${mailUrl}" class="action-btn" aria-label="Enviar Email">
            <i data-lucide="mail" class="icon"></i>
        </a>

    `;

    // 4. Redes Sociales
    const socialLinksContainer = document.getElementById('social-links');
    socialLinksContainer.innerHTML = ''; // Limpiar pre-contenido

    cardData.social.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.target = "_blank";
        a.className = "social-btn";
        a.setAttribute('aria-label', social.name);

        // Uso de íconos mediante Lucide. (p.ej. 'facebook', 'instagram', 'music-2')
        a.innerHTML = `<i data-lucide="${social.icon}" class="icon"></i>`;

        socialLinksContainer.appendChild(a);
    });

    // 4. Configurar Mapa Interactivo
    const mapIframe = document.getElementById('google-map');
    if (cardData.contact.googleMapsIframe) {
        mapIframe.src = cardData.contact.googleMapsIframe;
    } else {
        // Ocultar sección si no hay mapa
        document.getElementById('map-section').style.display = 'none';
    }

    // Inicializar Lucide Icons en el DOM renderizado
    lucide.createIcons();
}

/**
 * Función para generar archivo vCard
 */
function createVCard(data) {
    return `BEGIN:VCARD
VERSION:3.0
FN:${data.profile.name}
ORG:${data.contact.company}
TITLE:${data.profile.title}
TEL;TYPE=CELL:${data.contact.phoneDisplay}
EMAIL;TYPE=WORK:${data.contact.email}
URL:${data.contact.url}
NOTE:${data.contact.note.replace(/\n/g, '\\n')}
END:VCARD`;
}

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // 1. Rellenar datos en pantalla
    populateDOM();

    // 2. Configurar el botón de guardar contacto (vCard)
    const saveContactBtn = document.getElementById('save-contact-btn');
    saveContactBtn.addEventListener('click', () => {
        const vCardContent = createVCard(cardData);

        // Crear un Blob e iniciar descarga
        const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${cardData.profile.name.replace(/\s+/g, '_')}_Contacto.vcf`;

        document.body.appendChild(link);
        link.click();

        // Limpieza de memoria
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Feedback al usuario (opcional)
        const originalText = saveContactBtn.innerHTML;
        saveContactBtn.innerHTML = '<i data-lucide="check" class="icon"></i>¡Guardado!';
        lucide.createIcons();

        setTimeout(() => {
            saveContactBtn.innerHTML = originalText;
            lucide.createIcons();
        }, 2000);
    });

    // 3. Configurar API Nativa Web Share
    const shareBtn = document.getElementById('share-btn');
    if (!navigator.share) {
        shareBtn.parentElement.style.display = 'none'; // Ocultar si el navegador no lo soporta
    } else {
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: `${cardData.profile.name} - ${cardData.profile.title}`,
                    text: `Aquí tienes la tarjeta digital de ${cardData.profile.name}.`,
                    url: cardData.contact.url
                });
            } catch (error) {
                console.log('Cancelado / Error al compartir:', error);
            }
        });
    }
});
