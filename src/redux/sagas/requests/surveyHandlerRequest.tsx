import { api } from "@/api-config/api";
import { ICreateQuestion, ICreateSurvey, IGetQuestionsById, IGetSurvey, IGetSurveyById, IGetSurveyQuestions, } from "@/types/surveyInterface";

export const getSurveyApi = async (data: IGetSurvey) => {
    return await api.get(`admin/surveys?page=${data?.current_page}&search=${data?.search}`);
};

export const createSurveyApi = async (data: ICreateSurvey) => {
    // Create a FormData instance
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surveyNudgeIcon", data.surveyNudgeIcon); // Assuming surveyIcon is a file or a string path
    formData.append("surveyNudgeContent", data.surveyContent);
    formData.append("priority", data.priority.toString()); // Convert number to string
    formData.append("startAt", new Date(data.startDate).toISOString()); // Format date as ISO string
    formData.append("endAt", new Date(data.expiryDate).toISOString()); // Format date as ISO string

    // Use FormData as the payload
    return await api.post(`admin/surveys`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Set content type for FormData
        },
    });
};

export const updateSurveyApi = async (data: ICreateSurvey) => {
    // Create a FormData instance
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.surveyNudgeIcon instanceof File) {
        formData.append("surveyNudgeIcon", data.surveyNudgeIcon); // Assuming surveyIcon is a file or a string path
    }
    formData.append("surveyNudgeContent", data.surveyContent);
    formData.append("priority", data.priority.toString()); // Convert number to string
    formData.append("startAt", new Date(data.startDate).toISOString()); // Format date as ISO string
    formData.append("endAt", new Date(data.expiryDate).toISOString()); // Format date as ISO string

    // Use FormData as the payload
    return await api.put(`admin/surveys/${data.id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Set content type for FormData
        },
    });
};

export const deleteSurveyApi = async (id:  number) => {
    return await api.delete(`admin/surveys/${id}`);
};

export const createQuestionApi = async (data: ICreateQuestion) => {
    // Create a FormData instance
    console.log('createQuestionApi data2423423', data)
    const formData = new FormData();
    formData.append("surveyId", data.surveyId);
    if (data.options.length > 0 && data.optionType !== 'image') {
        data.options.forEach((option, index) => {
            formData.append(`options[${index}][text]`, option.optionText);
        });
    }

    if (data.optionsImage.length > 0 && data.optionType !== 'text') {
        data.optionsImage.forEach((option, index) => {
            formData.append(`options[${index}][text]`, option.options);
        });
    };

    // if(data.optionType == 'image') {
    if (data.optionsImage.length > 0 && data.optionType !== 'text') {
        data.optionsImage.forEach((option, index) => {
            formData.append(`options[${index}][image]`, option.image);
        });
    };
    // }


    formData.append('questionType', data.questionType.toUpperCase());
    formData.append('audience', data.audience.toUpperCase());
    formData.append('optionType', data.optionType.toUpperCase());
    formData.append('isSkippable', data?.isSkippable);
    formData.append('incentivePoint', data?.incentivePoint);
    formData.append('questionText', data.questionText);

    return await api.post(`admin/questions`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Set content type for FormData
        },
    });
}

export const updateQuestionApi = async (data: ICreateQuestion) => {
    // Create a FormData instance
    console.log('createQuestionApi data2423423', data)
    const formData = new FormData();
    formData.append("surveyId", data.surveyId);


    if (data.optionType !== 'image') {
        data.options.forEach((option, index) => {
       
            formData.append(`options[${index}][id]`, option.optionId);
        });
        data.options.forEach((option, index) => {
            console.log(option, "alksdjflksaj option")
            if(option.optionText){
            formData.append(`options[${index}][text]`, option.optionText && option.optionText !== undefined && option.optionText !== false && option.optionText);
        }
        });
    }

    if (data.optionsImage.length > 0 && data.optionType !== 'text') {
        data.optionsImage.forEach((option, index) => {
            formData.append(`options[${index}][image]`, option.optionImage ? option.optionImage : option.image);
        });
        data.optionsImage.forEach((option, index) => {
            formData.append(`options[${index}][text]`, option.optionText);
        });
        data.optionsImage.forEach((option, index) => {
            formData.append(`options[${index}][id]`, option.optionId);
        });
    };
    // };
    formData.append('questionType', data.questionType.toUpperCase());
    formData.append('audience', data.audience.toUpperCase());
    formData.append('optionType', data.optionType.toUpperCase());
    formData.append('isSkippable', data?.isSkippable);
    formData.append('incentivePoint', data?.incentivePoint);
    formData.append('questionText', data.questionText);

    return await api.put(`admin/questions/${data.questionId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Set content type for FormData
        },
    });
}

export const deleteQuestionApi = async (data:any) => {
    return await api.delete(`admin/questions/${data.id}`);
};

export const getQuestionByIdApi = async (data: IGetQuestionsById) => {
    return await api.get(`admin/questions/${data.questionId}`);
};

export const getSurveyQuestionsApi = async (data: IGetSurveyQuestions) => {
    return await api.get(`admin/surveys/${data.surveyId}/questions?page=${data?.current_page}&search=${data?.search}`);
};

export const getSurveyByIdApi = async (data: IGetSurveyById) => {
    return await api.get(`admin/surveys/${data.surveyId}`);
};