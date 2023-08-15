export interface question_props {
    question: string,
    a1: string,
    a2: string,
    a3: string,
    a4: string,
}

export interface user_details {
    firstName: string;
    lastName: string;
    age: number;
    phone: string;
    email: string;
}

export interface payload {
    user: user_details;
    answers: Array<string>;
}



