import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuração do Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitness_goal: 'lose_weight' | 'gain_muscle' | 'maintain_weight' | 'improve_endurance' | 'general_fitness';
  gym_days_per_week: number;
  allergies?: string[];
  dietary_restrictions?: string[];
}

export interface WorkoutPlan {
  name: string;
  description: string;
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  exercises: Array<{
    name: string;
    description: string;
    sets: number;
    reps: string;
    rest_seconds: number;
    muscle_groups: string[];
    equipment: string;
  }>;
}

export interface NutritionPlan {
  name: string;
  description: string;
  total_calories: number;
  meals: Array<{
    name: string;
    time: string;
    calories: number;
    foods: Array<{
      name: string;
      quantity: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }>;
  }>;
}

class GeminiService {
  private async generateContent(prompt: string): Promise<string> {
    try {
      // Verificar se a API key está configurada
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('Chave da API do Gemini não configurada');
      }

      console.log('Enviando prompt para Gemini...');
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Resposta recebida do Gemini:', text.substring(0, 200) + '...');
      return text;
    } catch (error) {
      console.error('Erro ao gerar conteúdo com Gemini:', error);
      throw new Error('Falha na comunicação com a IA');
    }
  }

  private parseWorkoutPlan(text: string): WorkoutPlan {
    try {
      console.log('Processando resposta do treino...');
      
      // Tentar extrair JSON do texto retornado
      let jsonMatch = text.match(/\{[\s\S]*\}/);
      
      // Se não encontrar, tentar encontrar entre ```json e ```
      if (!jsonMatch) {
        const codeBlockMatch = text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (codeBlockMatch) {
          jsonMatch = [codeBlockMatch[1]];
        }
      }
      
      // Se ainda não encontrar, tentar encontrar qualquer JSON válido
      if (!jsonMatch) {
        const anyJsonMatch = text.match(/\{[\s\S]*?\}/);
        if (anyJsonMatch) {
          jsonMatch = anyJsonMatch;
        }
      }
      
      if (!jsonMatch) {
        console.error('Nenhum JSON encontrado na resposta:', text);
        throw new Error('Formato de resposta inválido');
      }
      
      const workoutData = JSON.parse(jsonMatch[0]);
      console.log('Dados do treino parseados:', workoutData);
      
      return {
        name: workoutData.name || 'Treino Personalizado',
        description: workoutData.description || 'Treino gerado pela IA baseado no seu perfil',
        duration_minutes: workoutData.duration_minutes || 60,
        difficulty_level: workoutData.difficulty_level || 'intermediate',
        exercises: workoutData.exercises || []
      };
    } catch (error) {
      console.error('Erro ao processar plano de treino:', error);
      console.error('Texto original:', text);
      // Retornar plano padrão em caso de erro
      return {
        name: 'Treino Personalizado',
        description: 'Treino gerado pela IA baseado no seu perfil',
        duration_minutes: 60,
        difficulty_level: 'intermediate',
        exercises: []
      };
    }
  }

  private parseMultipleWorkoutPlans(text: string): WorkoutPlan[] {
    try {
      console.log('Processando resposta dos treinos múltiplos...');
      
      // Tentar extrair JSON do texto retornado
      let jsonMatch = text.match(/\[[\s\S]*\]/);
      
      // Se não encontrar, tentar encontrar entre ```json e ```
      if (!jsonMatch) {
        const codeBlockMatch = text.match(/```json\s*(\[[\s\S]*?\])\s*```/);
        if (codeBlockMatch) {
          jsonMatch = [codeBlockMatch[1]];
        }
      }
      
      // Se ainda não encontrar, tentar encontrar qualquer JSON válido
      if (!jsonMatch) {
        const anyJsonMatch = text.match(/\[[\s\S]*?\]/);
        if (anyJsonMatch) {
          jsonMatch = anyJsonMatch;
        }
      }
      
      if (!jsonMatch) {
        console.error('Nenhum JSON encontrado na resposta:', text);
        throw new Error('Formato de resposta inválido');
      }
      
      const workoutData = JSON.parse(jsonMatch[0]);
      console.log('Dados dos treinos parseados:', workoutData);
      
      if (!Array.isArray(workoutData)) {
        throw new Error('Resposta deve ser um array de treinos');
      }
      
      return workoutData.map((workout: any) => ({
        name: workout.name || 'Treino Personalizado',
        description: workout.description || 'Treino gerado pela IA',
        duration_minutes: workout.duration_minutes || 60,
        difficulty_level: workout.difficulty_level || 'intermediate',
        exercises: (workout.exercises || []).map((exercise: any, index: number) => {
          // Validar e corrigir repetições absurdas
          let reps = exercise.reps || 10;
          if (typeof reps === 'string') {
            // Se for string como "8-10", pegar o primeiro número
            const match = reps.match(/(\d+)/);
            reps = match ? parseInt(match[1]) : 10;
          }
          // Limitar a 20 repetições máximo
          if (reps > 20) {
            console.warn(`Repetições absurdas detectadas: ${reps}, limitando a 20`);
            reps = 20;
          }
          // Garantir mínimo de 4 repetições
          if (reps < 4) {
            reps = 4;
          }
          
          return {
            ...exercise,
            reps: reps
          };
        })
      }));
    } catch (error) {
      console.error('Erro ao processar resposta dos treinos:', error);
      throw new Error('Falha ao processar planos de treino');
    }
  }

  private parseNutritionPlan(text: string): NutritionPlan {
    try {
      console.log('Processando resposta do plano nutricional...');
      
      // Tentar extrair JSON do texto retornado
      let jsonMatch = text.match(/\{[\s\S]*\}/);
      
      // Se não encontrar, tentar encontrar entre ```json e ```
      if (!jsonMatch) {
        const codeBlockMatch = text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (codeBlockMatch) {
          jsonMatch = [codeBlockMatch[1]];
        }
      }
      
      // Se ainda não encontrar, tentar encontrar qualquer JSON válido
      if (!jsonMatch) {
        const anyJsonMatch = text.match(/\{[\s\S]*?\}/);
        if (anyJsonMatch) {
          jsonMatch = anyJsonMatch;
        }
      }
      
      if (!jsonMatch) {
        console.error('Nenhum JSON encontrado na resposta:', text);
        throw new Error('Formato de resposta inválido');
      }
      
      const nutritionData = JSON.parse(jsonMatch[0]);
      console.log('Dados do plano nutricional parseados:', nutritionData);
      
      return {
        name: nutritionData.name || 'Plano Nutricional Personalizado',
        description: nutritionData.description || 'Plano nutricional gerado pela IA baseado no seu perfil',
        total_calories: nutritionData.total_calories || 2000,
        meals: nutritionData.meals || []
      };
    } catch (error) {
      console.error('Erro ao processar plano nutricional:', error);
      console.error('Texto original:', text);
      // Retornar plano padrão em caso de erro
      return {
        name: 'Plano Nutricional Personalizado',
        description: 'Plano nutricional gerado pela IA baseado no seu perfil',
        total_calories: 2000,
        meals: []
      };
    }
  }

  async generateWorkoutPlan(profile: UserProfile): Promise<WorkoutPlan[]> {
    const prompt = `
    Você é um personal trainer especializado em criar planos de treino personalizados e realistas.
    Crie ${profile.gym_days_per_week} planos de treino diferentes baseado no perfil do usuário fornecido.

    Perfil do usuário:
    - Idade: ${profile.age} anos
    - Peso: ${profile.weight} kg
    - Altura: ${profile.height} cm
    - Gênero: ${profile.gender}
    - Nível de atividade: ${profile.activity_level}
    - Objetivo: ${profile.fitness_goal}
    - Dias na academia por semana: ${profile.gym_days_per_week}

    ESTRUTURA OBRIGATÓRIA DO TREINO:
    1. Tipo de Treino: Deve ser "Treino A", "Treino B", "Treino C", etc.
    2. Grupo Muscular: Especificar claramente (ex: "Peito e Tríceps", "Costas e Bíceps", "Pernas")
    3. Tempo Máximo: Duração total do treino (45-75 minutos)
    4. Número de Exercícios: Entre 6-8 exercícios por treino

    DETALHES DOS EXERCÍCIOS:
    - Nome do Exercício: Nome claro e específico
    - Séries e Repetições: Números realistas baseados no objetivo:
      * FORÇA: 4-6 séries de 4-8 repetições
      * HIPERTROFIA: 3-4 séries de 8-12 repetições  
      * RESISTÊNCIA: 2-3 séries de 12-20 repetições
      * REGRA OBRIGATÓRIA: MÁXIMO 20 repetições por série (nunca mais que 20)
      * EXEMPLOS CORRETOS: 8, 10, 12, 15, 18, 20 repetições
      * EXEMPLOS INCORRETOS: 50, 100, 500, 1000+ repetições
    - Descanso: Tempo realista entre séries (30-120 segundos)

    IMPORTANTE: Responda APENAS com um JSON válido no seguinte formato:
    [
      {
        "name": "Treino A - Peito e Tríceps",
        "description": "Treino focado em desenvolvimento do peitoral e tríceps",
        "duration_minutes": 60,
        "difficulty_level": "beginner|intermediate|advanced",
        "exercises": [
          {
            "name": "Supino Reto com Barra",
            "description": "Deitado no banco, segure a barra com pegada ligeiramente mais larga que os ombros. Desça controladamente até o peito e empurre para cima.",
                      "sets": 4,
                      "reps": 8,
                      "rest_seconds": 90,
            "muscle_groups": ["peito", "tríceps"],
            "equipment": "barra e banco"
          }
        ]
      }
    ]

    DIRETRIZES OBRIGATÓRIAS:
    - Crie ${profile.gym_days_per_week} treinos diferentes
    - Cada treino deve ter 6-8 exercícios
    - Repetições devem ser REALISTAS (nunca exceder 20 por série)
    - Tempo de descanso deve ser adequado ao exercício (30-120s)
    - Grupos musculares devem ser equilibrados entre os treinos
    - Nomes dos treinos devem seguir o padrão: "Treino [LETRA] - [GRUPOS MUSCULARES]"
    - Baseie as repetições no objetivo do usuário: ${profile.fitness_goal}
    - Use equipamentos básicos: halteres, barra, peso corporal, banco
    - REGRA OBRIGATÓRIA: Máximo 20 repetições por série (nunca 21, 25, 30, 50, 100, 500, 1000+)
    - Para exercícios de alta resistência, use 15-20 repetições máximo
    - NUNCA use números absurdos como 100, 500, 1000+ repetições
    - Use apenas números entre 4-20 repetições por série
    `;

    const response = await this.generateContent(prompt);
    return this.parseMultipleWorkoutPlans(response);
  }

  async generateNutritionPlan(profile: UserProfile): Promise<NutritionPlan> {
    const allergies = profile.allergies?.length ? `Alergias: ${profile.allergies.join(', ')}` : 'Nenhuma alergia conhecida';
    const restrictions = profile.dietary_restrictions?.length ? `Restrições: ${profile.dietary_restrictions.join(', ')}` : 'Nenhuma restrição dietética';

    const prompt = `
Você é um nutricionista especializado em criar planos alimentares personalizados.
Crie um plano nutricional baseado no perfil do usuário fornecido.

IMPORTANTE: Use SEMPRE português brasileiro em TODAS as respostas.

Perfil do usuário:
- Idade: ${profile.age} anos
- Peso: ${profile.weight} kg
- Altura: ${profile.height} cm
- Gênero: ${profile.gender}
- Nível de atividade: ${profile.activity_level}
- Objetivo: ${profile.fitness_goal}
- ${allergies}
- ${restrictions}

IMPORTANTE: Responda APENAS com um JSON válido no seguinte formato:
{
  "name": "Plano Nutricional Personalizado",
  "description": "Plano alimentar completo e balanceado para seu objetivo",
  "total_calories": 2000,
  "meals": [
    {
      "name": "Café da Manhã Energético",
      "meal_type": "Café da Manhã",
      "suggested_time": "07:00 - 08:00",
      "calories": 500,
      "protein": 25,
      "carbs": 60,
      "fat": 15,
      "fiber": 8,
      "benefits": [
        "Energia para começar o dia",
        "Saciedade prolongada",
        "Suporte ao metabolismo"
      ],
      "instructions": [
        "Misture a aveia com leite e deixe descansar por 5 minutos",
        "Adicione as frutas picadas e as sementes",
        "Misture bem e sirva imediatamente"
      ],
      "tips": [
        "Pode preparar na noite anterior e guardar na geladeira",
        "Substitua as frutas conforme a estação",
        "Adicione mel se preferir mais doce"
      ],
      "meal_foods": [
        {
          "food_name": "Aveia em flocos",
          "quantity": 50,
          "unit": "g",
          "calories_per_unit": 4
        },
        {
          "food_name": "Banana",
          "quantity": 1,
          "unit": "unidade média",
          "calories_per_unit": 90
        }
      ]
    }
  ]
}

DIRETRIZES OBRIGATÓRIAS:
- Crie EXATAMENTE 4 refeições por dia: "Café da Manhã", "Almoço", "Lanche", "Jantar"
- Para cada refeição, inclua TODAS as informações solicitadas
- Horários sugeridos realistas (ex: 07:00-08:00, 12:00-13:00, 15:00-16:00, 19:00-20:00)
- Benefícios específicos e úteis para cada refeição
- Instruções de preparo simples e práticas
- Dicas de substituições e variações
- Quantidades precisas em gramas, unidades ou medidas caseiras
- Valores nutricionais realistas e balanceados
- Foque no objetivo do usuário: ${profile.fitness_goal}
- Considere as restrições: ${restrictions}
- Use alimentos acessíveis e fáceis de encontrar
- IMPORTANTE: Use SEMPRE português brasileiro para meal_type: "Café da Manhã", "Almoço", "Lanche", "Jantar"
`;

    const response = await this.generateContent(prompt);
    return this.parseNutritionPlan(response);
  }

  async generateGoalSuggestions(profile: UserProfile): Promise<string[]> {
    const prompt = `
Com base no perfil do usuário, sugira 3-5 metas realistas e específicas para os próximos 3 meses.

Perfil:
- Idade: ${profile.age} anos
- Peso: ${profile.weight} kg
- Altura: ${profile.height} cm
- Gênero: ${profile.gender}
- Nível de atividade: ${profile.activity_level}
- Objetivo: ${profile.fitness_goal}

Responda APENAS com um array JSON de strings, cada uma sendo uma meta específica e mensurável.
Exemplo: ["Perder 5kg em 3 meses", "Treinar 4x por semana", "Consumir 2L de água por dia"]
`;

    try {
      const response = await this.generateContent(prompt);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      console.error('Erro ao gerar sugestões de metas:', error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();
