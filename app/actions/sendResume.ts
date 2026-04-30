"use server"

export async function sendResume(formData: FormData) {
  try {
    const nome = formData.get("nome") as string;
    const cargo = formData.get("cargo") as string;
    const file = formData.get("file") as File;

    // Converte o File para ArrayBuffer e depois para Blob explícito
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const n8nFormData = new FormData();
    n8nFormData.append("nome", nome);
    n8nFormData.append("cargo", cargo);
    n8nFormData.append("file", blob, file.name); // <-- nome do arquivo explícito

    const response = await fetch(process.env.N8N_URL!, {
      method: "POST",
      body: n8nFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro n8n:", errorText);
      throw new Error("Erro na integração com n8n");
    }

    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    throw error;
  }
}