// Import the GoogleGenerativeAI module at the top level
import { GoogleGenerativeAI } from "@google/generative-ai";

// form function
document.getElementById('formSection').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const favorite = document.getElementById('fav').value;

    const API_KEY = 'AIzaSyB5hKB1X6DskvRpv8sFOubBrTZ5cMlmDGs';
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function run() {
        const prompt = `
        Generate a minimum 8 and maximum 20 character password using the following criteria:
        - Incorporate at least one uppercase letter, one lowercase letter, one number, and one special character.
        - Base the password on the provided "Favorite Things" input.
        - Avoid using numbers from the "Date of Birth" input.
        - Prioritize character substitutions (e.g., 'a' to '@') for special characters.
        - If "Favorite Things" input is random character/not readable, output "System Error: your input is <strong>too random</strong> or <strong>forbidden word</strong>".
        - If "Favorite Things" input is similar to Name, Email, or Date of Birth, output "System Error: your input is <strong>similar</strong> to Name, Email, or Date of Birth"

        Name: ${name}
        Email: ${email}
        Date of Birth: ${dob}
        Favorite Things: ${favorite}

        Output: (just write result/error)

        This is the example of it
        Favorite Things: Capcay
        Output should be: c@Pcay07
        reason: minimum leght is 8, letter a is similar to @ so I can change it to add special character. at the end of output I put 2 random number, the number should be just 2 number for easier remembering

        Favorite Things: Samyang Buldak
        output should be: 5Amy@n9_8uLd@k
        reason: letter a is similar to @ so I can change it to add special character. the letter 5 is similar to S, 9 is similar to g and 8 is similar to 8. because there are already have the criteria needed. so we doesn't need to add another character or random number

        Name: Yusuf
        Date of Birth: 15 May 2004
        Favorite Things: yusuF1505
        Output shuould be: System Error: System Error: your input is <strong>similar</strong> to Name, Email, or Date of Birth
        Reason: because "yusuf" is similar to name and "1505" is similar with date of birth which is 15 may (month 5)
        `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            window.location.href = `result.html?password=${encodeURIComponent(text)}`;
        } catch (error) {
            console.error("Error during message generation:", error);
            window.location.href = `result.html?password=${encodeURIComponent("This content is not safe for display based on current settings. or an internal error.")}`;
        }
    }

    run();
});