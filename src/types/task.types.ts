export const COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "magenta",
    "beige",
] as const;

export type Color = typeof COLORS[number];

export const COLOR_HEX: Record<Color, string> = {
    red: "#ff3b30",
    orange: "#ff9500",
    yellow: "#ffcc00",
    green: "#34c759",
    blue: "#007aff",
    indigo: "#5856d6",
    violet: "#af52de",
    magenta: "#ff2d55",
    beige: "#a2845e",
};


export type Task = {
    id: number;
    title: string;
    color: Color;
    completed: boolean;
}

export type CreateTaskInput = {
    title: string;
    color: Color;        
    completed: boolean;
};

export type TaskCount = {
    total: number;
    completed: number;
    pending: number;
};


export type UpdateTaskInput = Partial<CreateTaskInput>;
