# PWA Icons for TypingRush

This directory contains the icons needed for the Progressive Web App (PWA) functionality of TypingRush.

## Required Icons

The following icon sizes are required for the PWA to work properly on different devices:

- icon-72x72.png (72x72 pixels)
- icon-96x96.png (96x96 pixels)
- icon-128x128.png (128x128 pixels)
- icon-144x144.png (144x144 pixels)
- icon-152x152.png (152x152 pixels)
- icon-192x192.png (192x192 pixels)
- icon-384x384.png (384x384 pixels)
- icon-512x512.png (512x512 pixels)

## How to Create the Icons

1. Use the existing `TypingRushLogo.png` or `faviconTyping.png` from the public directory as a base.
2. Resize the image to each of the required sizes.
3. Save each resized image with the corresponding filename in this directory.
4. Make sure the icon-512x512.png is set with the purpose "any maskable" in the manifest.

You can use image editing tools like Photoshop, GIMP, or online tools like [RealFaviconGenerator](https://realfavicongenerator.net/) to create these icons.

## Important Note

All these icons are referenced in the PWA configuration in `nuxt.config.ts`. Make sure all the icon files exist to avoid 404 errors when the PWA is installed.