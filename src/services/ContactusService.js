const API_URL = `${process.env.REACT_APP_API_URL.trim()}/emailManager`;


const contactUs = async (emailContent) => {

    try {
        
        const response = await fetch(API_URL + "/contactUs", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json-patch+json',
            },
            body: JSON.stringify(emailContent),
        });

        if (!response.ok) throw new Error('Failed to save the level');

        return await response.json();
    } catch (error) {
        console.error('Error saving level:', error);
        throw error;
    }
};


export default {
    contactUs,
};