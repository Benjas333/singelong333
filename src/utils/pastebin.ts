import axios from "axios";

const devApiKey = '5BWwBYqCvKg38gQRnyCzJsSFqGVeAoo4';
const pasteBinUrl = 'https://pastebin.com/api/api_post.php'

export const logToPasteBin = async (title: string, content: string | object): Promise<void> => {
        const body = typeof content != 'string' ? JSON.stringify(content, null, 4) : content
        
        try {
                const response = await axios.post(pasteBinUrl, {
                        api_dev_key: devApiKey,
                        api_paste_code: body,
                        api_option: 'paste',
                        api_paste_private: 1,
                        api_paste_name: title
                }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                const url = response.data;
                console.log(`Uploaded data to: ${url}`)
        } catch (error) {
                const err = error as axios.AxiosError;
                if (err.response) console.error(err.response.data)
                console.error(`Fetching error: ${err.message}`);
                console.log(content)
        }
}
