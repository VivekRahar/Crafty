import { useCallback, useState } from 'react';
import { imageUploadSchema } from '../schemas/imageUploadSchema';

const paletteFor = (craft) => {
  const name = `${craft.name} ${craft.category}`.toLowerCase();
  if (/pottery|ceramic/.test(name)) return { label: 'blue and mineral tones', rgb: [76, 132, 164] };
  if (/metal|bidri|thewa|koftgari/.test(name)) return { label: 'metallic and dark tones', rgb: [112, 101, 81] };
  if (/painting|phulkari/.test(name)) return { label: 'rich, varied pigments', rgb: [158, 105, 77] };
  if (/textile|silk|shawl|pashmina|print|ikat|bandhej/.test(name)) return { label: 'soft textile tones', rgb: [158, 127, 110] };
  return { label: 'natural craft tones', rgb: [140, 126, 101] };
};

const readAverageColour = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 24; canvas.height = 24;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, 0, 0, 24, 24);
      const pixels = context.getImageData(0, 0, 24, 24).data;
      let red = 0, green = 0, blue = 0, count = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] < 30) continue;
        red += pixels[i]; green += pixels[i + 1]; blue += pixels[i + 2]; count += 1;
      }
      URL.revokeObjectURL(url);
      resolve([red / count, green / count, blue / count]);
    } catch (error) { URL.revokeObjectURL(url); reject(error); }
  };
  image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('This image could not be read. Try another JPG or PNG.')); };
  image.src = url;
});

export function useCraftScan() {
  const [scan, setScan] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(async (file, craft) => {
    const validation = imageUploadSchema.safeParse({ file, craftId: craft?.id || '' });
    if (!validation.success) { setError(validation.error.issues[0].message); setScan(null); return null; }
    setError(''); setLoading(true);
    try {
      const average = await readAverageColour(file);
      const palette = paletteFor(craft);
      const distance = Math.sqrt(average.reduce((sum, value, index) => sum + (value - palette.rgb[index]) ** 2, 0));
      const similarity = Math.max(12, Math.min(97, Math.round(100 - (distance / 441.7) * 100)));
      const verdict = similarity >= 75 ? 'Likely Authentic' : similarity >= 50 ? 'Needs Verification' : 'Likely Mismatch';
      const next = { id: `${Date.now()}`, craftId: craft.id, craftName: craft.name, giNumber: craft.giNumber, registeredYear: craft.registeredYear, verdict, confidence: similarity, palette: palette.label, createdAt: new Date().toLocaleString() };
      setScan(next); return next;
    } catch (scanError) {
      setError(scanError.message || 'Could not analyse that image. Please try another.'); setScan(null); return null;
    } finally { setLoading(false); }
  }, []);

  return { scan, setScan, error, setError, loading, analyze };
}
