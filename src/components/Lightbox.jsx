import { useEffect, useRef } from 'react';

// Full-size viewer for certificates and photos, built on <dialog>.
export default function Lightbox({ src, alt, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (src && !d.open) d.showModal();
    if (!src && d.open) d.close();
  }, [src]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={alt}
    >
      {src && <img src={src} alt={alt} />}
      <button type="button" className="label-tape lightbox-close" onClick={onClose}>
        Close
      </button>
    </dialog>
  );
}
