import { Type } from "@google/genai";

export enum Difficulty {
  Beginner = "初级",
  Intermediate = "中级",
  Advanced = "高级",
}

export enum GrammarPoint {
  NonFinite = "非谓语动词",
  RelativeClause = "定语从句",
  AdverbialClause = "状语从句",
  Conjunction = "连词",
  NounClause = "名词性从句",
}

export interface Question {
  id: string;
  sentence: string; // Use "____" for blanks
  options: string[];
  correctAnswer: string;
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
  };
  difficulty: Difficulty;
  category: GrammarPoint;
}

export const QUESTION_BANK: Question[] = [
  {
    id: "1",
    sentence: "______ tired, she still finished the report.",
    options: ["Being", "Been", "To be", "Although"],
    correctAnswer: "Although",
    explanation: {
      rule: "本句意为'虽然累，她还是完成了报告'。Although 引导让步状语从句，此处为省略主语和 be 动词的结构（Although she was tired）。",
      example: "Although (he was) busy, he came to help us.",
      commonMistake: "容易误选 Being，但 Being tired 虽可作状语，通常表示原因，且 Although 逻辑更符合 'still' 的转折语境。",
    },
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.AdverbialClause,
  },
  {
    id: "2",
    sentence: "The boy ______ is playing football is my brother.",
    options: ["which", "who", "whom", "whose"],
    correctAnswer: "who",
    explanation: {
      rule: "定语从句修饰先行词 the boy（人），从句中缺少主语，故使用 who。",
      example: "The girl who is singing is my sister.",
      commonMistake: "误选 which，which 用于修饰物。",
    },
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.RelativeClause,
  },
  {
    id: "3",
    sentence: "I don't know ______ he will come or not.",
    options: ["if", "whether", "that", "what"],
    correctAnswer: "whether",
    explanation: {
      rule: "在宾语从句中，当句末有 or not 时，通常只能用 whether 而不用 if。",
      example: "I wonder whether it will rain or not.",
      commonMistake: "误选 if，虽然 if 也可以引导宾语从句表示'是否'，但不能直接与 or not 连用。",
    },
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.NounClause,
  },
  {
    id: "4",
    sentence: "______ his homework, he went out to play.",
    options: ["Finish", "Finished", "Finishing", "Having finished"],
    correctAnswer: "Having finished",
    explanation: {
      rule: "非谓语动词作时间状语。'完成作业'发生在'出去玩'之前，强调先后顺序，使用现在分词的完成式 Having done。",
      example: "Having seen the movie, I don't want to see it again.",
      commonMistake: "误选 Finishing，虽然也表示主动，但 Having finished 更强调动作的先后性。",
    },
    difficulty: Difficulty.Advanced,
    category: GrammarPoint.NonFinite,
  },
  {
    id: "5",
    sentence: "This is the place ______ I visited last year.",
    options: ["where", "which", "when", "that"],
    correctAnswer: "which",
    explanation: {
      rule: "定语从句修饰 the place。虽然是地点，但从句中 visit 是及物动词，缺少宾语，故用 which 或 that。",
      example: "The house which we bought is very old.",
      commonMistake: "误选 where。where 是关系副词，在从句中作状语。如果从句不缺主宾语才用 where。",
    },
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.RelativeClause,
  },
  {
    id: "6",
    sentence: "You won't pass the exam ______ you work hard.",
    options: ["if", "unless", "because", "as"],
    correctAnswer: "unless",
    explanation: {
      rule: "unless 相当于 if...not，意为'除非'。句意：除非你努力，否则你不会通过考试。",
      example: "I will go unless it rains.",
      commonMistake: "误选 if，if you work hard 语义相反。",
    },
    difficulty: Difficulty.Beginner,
    category: GrammarPoint.Conjunction,
  },
  {
    id: "7",
    sentence: "I saw him ______ the room just now.",
    options: ["enter", "entered", "to enter", "enters"],
    correctAnswer: "enter",
    explanation: {
      rule: "感官动词 see/hear/watch 后的宾语补足语，用不带 to 的不定式表示动作全过程，或用 doing 表示动作正在进行。",
      example: "I heard her sing a song.",
      commonMistake: "误选 to enter。see sb. do sth. 中不定式符号 to 必须省略。",
    },
    difficulty: Difficulty.Intermediate,
    category: GrammarPoint.NonFinite,
  },
  {
    id: "8",
    sentence: "The news ______ our team won the game is exciting.",
    options: ["which", "that", "what", "who"],
    correctAnswer: "that",
    explanation: {
      rule: "同位语从句。that 引导从句解释 news 的具体内容，that 在从句中不作成分，仅起连接作用。",
      example: "The fact that he failed surprised us all.",
      commonMistake: "误选 which。which 在定语从句中作成分，而此处从句成分完整，是同位语从句。",
    },
    difficulty: Difficulty.Advanced,
    category: GrammarPoint.NounClause,
  }
];
