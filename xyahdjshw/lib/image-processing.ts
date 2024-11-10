import * as tf from '@tensorflow/tfjs';
import { MODEL_CONFIG } from './constants';

export async function preprocessImage(file: File): Promise<tf.Tensor4D> {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const { imageSize } = MODEL_CONFIG;

      img.onload = () => {
        // Ensure we're in a try block for proper error handling
        try {
          const tensor = tf.tidy(() => {
            // Create canvas for resizing
            const canvas = document.createElement('canvas');
            canvas.width = imageSize;
            canvas.height = imageSize;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              throw new Error('Failed to get canvas context');
            }

            // Draw and resize image
            ctx.drawImage(img, 0, 0, imageSize, imageSize);

            // Convert to tensor and normalize
            return tf.browser.fromPixels(canvas)
              .toFloat()
              .div(255.0)
              .expandDims(0) as tf.Tensor4D;
          });

          resolve(tensor);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      
      // Create object URL and clean it up after loading
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        img.onload(new Event('load'));
      };
    } catch (error) {
      reject(error);
    }
  });
}