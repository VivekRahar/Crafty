import { z } from 'zod';

export const imageUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'Choose a JPG or PNG image.')
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Image must be smaller than 5 MB.'),
  craftId: z.string().min(1, 'Choose a craft category before analysing.'),
});
