import * as z from "zod";

export const curriculumSchema = z.object({
  nome: z.string().min(2, "Identifique-se para começar"),
  cargo: z.string().min(2, "O cargo é essencial para a análise"),
  email: z.string().email("E-mail precisa ser válido!"),
});

export type CurriculumData = z.infer<typeof curriculumSchema>;

export interface Curriculum extends CurriculumData {
  file: File;
}