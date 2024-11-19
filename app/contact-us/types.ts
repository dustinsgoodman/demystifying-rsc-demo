import { z, typeToFlattenedError } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,}$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormState = {
  success: boolean;
  error?: typeToFlattenedError<ContactFormData>;
  fields: ContactFormData;
};
