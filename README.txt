Drop your 5 illustrated background PNGs into this folder using these exact filenames
(or update the paths in index.html / Portfolio.css if you'd rather use different names):

  hero-bg.png        → Hero section        (referenced in index.html, inline <image> inside the hero SVG)
  about-bg.png        → About section       (referenced in Portfolio.css, .about-section)
  portfolio-bg.png     → Projects section    (referenced in Portfolio.css, .portfolio-section)
  services-bg.png     → Services section    (referenced in Portfolio.css, .services-section, appears twice)
  contact-bg.png       → Contact section     (referenced in Portfolio.css, .contact-section, appears twice)

Notes:
- Each section keeps its original flat color as a fallback, so nothing breaks if an
  image is missing or hasn't loaded yet.
- All four CSS-based backgrounds (about/portfolio/services/contact) use
  background-size: cover + background-position: center, so any image aspect ratio
  will fill the section without distortion (cropping edges as needed).
- The hero background is handled slightly differently (as an SVG <image> element,
  not a CSS background) because the whole hero is one big inline SVG illustration.
  It also uses a "slice" fit so it crops to fill rather than stretching.
- Recommended size: roughly 1920×1080 (or larger) for hero/portfolio since they're
  wide, full-bleed sections; about/services/contact can be slightly smaller but
  should still be high-res for retina screens.
