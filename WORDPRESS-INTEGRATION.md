# WordPress + ACF Integration Guide

## 🎨 Gallery Images - Automatic Orientation Detection

### Data Structure

Ogni immagine nella gallery deve avere:
```json
{
  "url": "https://tuosito.com/uploads/foto.jpg",
  "orientation": "landscape" | "portrait"
}
```

### WordPress/ACF Configuration

#### 1. Custom Post Type: "Works"
- Slug: `works`
- Supports: title, editor, thumbnail

#### 2. ACF Fields Group: "Work Details"

**Gallery Field:**
- Field Type: `Gallery`
- Field Name: `gallery`
- Return Format: `Array`

### PHP Function per Auto-Detection Orientation

Aggiungi questo nel file `functions.php` del tema:

```php
<?php
/**
 * Get image orientation based on dimensions
 * 
 * @param int $attachment_id WordPress attachment ID
 * @return string 'landscape', 'portrait', or 'square'
 */
function get_image_orientation($attachment_id) {
    $image_meta = wp_get_attachment_metadata($attachment_id);
    
    if (!$image_meta || !isset($image_meta['width']) || !isset($image_meta['height'])) {
        return 'landscape'; // Default fallback
    }
    
    $width = $image_meta['width'];
    $height = $image_meta['height'];
    $ratio = $width / $height;
    
    // Threshold per determinare l'orientamento
    // ratio > 1.2 = landscape (orizzontale)
    // ratio < 0.8 = portrait (verticale)
    // 0.8 <= ratio <= 1.2 = square (trattato come landscape)
    
    if ($ratio > 1.2) {
        return 'landscape';
    } elseif ($ratio < 0.8) {
        return 'portrait';
    } else {
        return 'landscape'; // Square images treated as landscape
    }
}

/**
 * REST API Endpoint per esportare Works in JSON
 */
add_action('rest_api_init', function () {
    register_rest_route('emiliano/v1', '/works', array(
        'methods' => 'GET',
        'callback' => 'get_works_json',
        'permission_callback' => '__return_true'
    ));
});

function get_works_json() {
    $args = array(
        'post_type' => 'works',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    );
    
    $works_query = new WP_Query($args);
    $works = array();
    
    if ($works_query->have_posts()) {
        while ($works_query->have_posts()) {
            $works_query->the_post();
            
            // Gallery ACF Field
            $gallery_images = get_field('gallery');
            $gallery_processed = array();
            
            if ($gallery_images) {
                foreach ($gallery_images as $image) {
                    $gallery_processed[] = array(
                        'url' => $image['url'],
                        'orientation' => get_image_orientation($image['ID'])
                    );
                }
            }
            
            $works[] = array(
                'id' => get_post_field('post_name'),
                'title' => get_the_title(),
                'type' => get_field('type'), // 'art' or 'design'
                'home' => get_field('show_on_home'),
                'category' => get_field('category'),
                'status' => get_field('status'),
                'description' => get_field('description'),
                'provenance' => get_field('provenance'),
                'specifications' => get_field('specifications'), // Repeater field
                'mainImage' => get_field('main_image')['url'],
                'videoCover' => get_field('video_cover')['url'],
                'gallery' => $gallery_processed
            );
        }
    }
    
    wp_reset_postdata();
    
    return rest_ensure_response($works);
}
?>
```

### Frontend Usage Example

Una volta configurato WordPress, puoi chiamare l'API:

```bash
GET https://tuosito.com/wp-json/emiliano/v1/works
```

Risposta JSON:
```json
[
  {
    "id": "vulcano",
    "title": "Vulcano",
    "gallery": [
      {
        "url": "https://tuosito.com/uploads/2024/01/foto1.jpg",
        "orientation": "landscape"
      },
      {
        "url": "https://tuosito.com/uploads/2024/01/foto2.jpg",
        "orientation": "portrait"
      }
    ]
  }
]
```

### Deploy Workflow

1. **Locale**: Sviluppo con `works.json` statico
2. **Staging**: WordPress API → fetch dinamico
3. **Build produzione**: Script che scarica da WP API e genera `works.json` statico

### Script di Build (Node.js)

```javascript
// scripts/fetch-works.js
const fs = require('fs');
const https = require('https');

const WP_API_URL = 'https://tuosito.com/wp-json/emiliano/v1/works';

https.get(WP_API_URL, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    fs.writeFileSync('./src/data/works.json', data);
    console.log('✅ Works fetched from WordPress');
  });
}).on('error', (err) => {
  console.error('❌ Error fetching works:', err.message);
});
```

Aggiungi al `package.json`:
```json
{
  "scripts": {
    "fetch:works": "node scripts/fetch-works.js",
    "build": "npm run fetch:works && astro build"
  }
}
```

---

## 📐 Masonry Logic

### Frontend Component

Il componente legge l'`orientation` e applica l'altezza corretta:

```javascript
const height = orientation === 'portrait' ? '60vh' : '45vh';
```

- **Landscape** (width > height): `45vh` - container orizzontale
- **Portrait** (height > width): `60vh` - container verticale  
- **Square** (width ≈ height): `45vh` - trattato come landscape

### CSS (già implementato)

```css
.masonry-img {
  background-size: cover;       /* No stretch */
  background-position: center;  /* Centered */
  background-repeat: no-repeat; /* No repeat */
}
```

---

## ✅ Checklist WordPress Setup

- [ ] Installare ACF Pro
- [ ] Creare Custom Post Type "Works"
- [ ] Creare ACF Field Group con tutti i campi
- [ ] Aggiungere funzione `get_image_orientation()` in `functions.php`
- [ ] Registrare REST API endpoint
- [ ] Testare endpoint: `/wp-json/emiliano/v1/works`
- [ ] Aggiungere script di fetch nel progetto Astro
- [ ] Configurare build pipeline

---

## 🎯 Risultato

Quando carichi un'immagine in WordPress:
1. WordPress rileva automaticamente le dimensioni
2. Calcola l'orientamento (landscape/portrait)
3. Salva nel JSON con metadata
4. Frontend Astro legge l'orientation
5. Applica il container giusto (45vh o 60vh)
6. Immagine si adatta con `cover` (no stretch!)

**100% Data-Driven & CMS-Ready** 🚀








