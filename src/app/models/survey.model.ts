export interface Survey
{
    topic: string,
    description: string,
    questions: 
        {
            index: number,
            question: string
        }[],
    
    surveyId: string
}

