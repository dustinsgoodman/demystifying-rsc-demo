import { contactFormSchema, ContactFormState } from "./types";
import { ContactForm } from "./ContactForm.client";

export default function ContactUsPage() {
  async function submitContact(
    prevState: ContactFormState,
    formData: FormData
  ): Promise<ContactFormState> {
    "use server";

    const data = {
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      phone: (formData.get("phone") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
    };

    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
      return {
        fields: { ...data },
        success: false,
        error: result.error.flatten(),
      };
    }

    // Here you would typically send an email or save to database
    console.log("Form submitted:", result.data);

    return {
      fields: { ...data },
      success: true,
      error: undefined,
    };
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <ContactForm handleSubmit={submitContact} />
    </div>
  );
}
