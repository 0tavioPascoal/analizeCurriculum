"use server";

export async function sendResume(formData: FormData) {
  try {
    const file = formData.get("file");
    const nome = formData.get("nome");
    const cargo = formData.get("cargo");
    const email = formData.get("email");

    if (!file || !(file instanceof Blob)) {
      throw new Error("Arquivo PDF obrigatório não encontrado.");
    }

    const webhookUrl = process.env.N8N_URL;
    if (!webhookUrl) throw new Error("URL do n8n não configurada.");

    const n8nData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n8nData.append("file", file, (file as any).name || "curriculo.pdf");
    n8nData.append("nome", String(nome));
    n8nData.append("cargo", String(cargo));
    n8nData.append("email", String(email)); 

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: n8nData,
    });

    if (!response.ok) {
      throw new Error(`Erro de comunicação: ${response.statusText}`);
    }

    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any){
    console.log(process.env.N8N_URL)
    console.error("Server Action Failure:", e.message);
    throw new Error(e.message);
  }
}