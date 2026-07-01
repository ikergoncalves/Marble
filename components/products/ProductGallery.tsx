'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.css';

export interface ProductGalleryProps {
  /** Primary cover image; always the first thumbnail. */
  coverImage: string;
  /** Additional preview shots shown after the cover. */
  previewImages: string[];
  /** Product name, used for descriptive alt text. */
  name: string;
}

/**
 * Product image gallery: one large active image with a row of clickable
 * thumbnails (cover first, then previews). Selection is simple local state —
 * no lightbox or zoom this phase.
 */
export function ProductGallery({ coverImage, previewImages, name }: ProductGalleryProps) {
  const images = [coverImage, ...previewImages];
  const [activeIndex, setActiveIndex] = useState(0);
  // `noUncheckedIndexedAccess` makes the lookup `string | undefined`; the cover is
  // always present, so fall back to it and keep a plain `string`.
  const activeSrc = images[activeIndex] ?? coverImage;

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        <Image
          key={activeSrc}
          src={activeSrc}
          alt={`${name} — preview ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 55vw"
          className={styles.stageImage}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails} role="list">
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                role="listitem"
                className={`${styles.thumbnail} ${isActive ? styles.thumbnailActive : ''}`}
                aria-label={`Show preview ${index + 1}`}
                aria-current={isActive}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className={styles.thumbnailImage}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
