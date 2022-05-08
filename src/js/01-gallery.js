import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
//preview, original, description

const gallery = document.querySelector(".gallery")

const makeGalleryItems = e => {
    const { preview, original, description } = e;

    return `
    <li style="display: contents;">
        <a class="gallery__item" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>`;
};

const galleryItemsList = galleryItems.map(makeGalleryItems).join('')

gallery.insertAdjacentHTML("beforeend", galleryItemsList)

const lightbox = new SimpleLightbox('.gallery .gallery__item', {
    close: true,
    captionsData: 'alt',
});