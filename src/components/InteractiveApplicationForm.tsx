import { useState, useRef, type FormEvent } from 'react';

export default function InteractiveApplicationForm() {
    const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' | null }>({ text: '', type: null });
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handlePhoneInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        let input = target.value.replace(/\D/g, '');
        if (input.length > 10) {
            input = input.substring(0, 10);
        }
        let formattedInput = '';
        if (input.length > 0) formattedInput = `(${input.substring(0, 3)}`;
        if (input.length >= 4) formattedInput += `) ${input.substring(3, 6)}`;
        if (input.length >= 7) formattedInput += `-${input.substring(6, 10)}`;
        target.value = formattedInput;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage({ text: '', type: null });

        const formData = new FormData(e.currentTarget);
        const fullName = formData.get('full-name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const position = formData.get('position') as string;
        const resumeFile = formData.get('resume') as File;

        // Validation
        if (!fullName.trim() || !email.trim() || !phone.trim() || !position.trim()) {
            setMessage({ text: 'All fields are required. Please fill them out and try again.', type: 'error' });
            return;
        }
        if (resumeFile.size === 0) {
            setMessage({ text: 'A resume file is required. Please upload your resume.', type: 'error' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({ text: 'Please enter a valid email address.', type: 'error' });
            return;
        }
        if (phone.length < 14) {
            setMessage({ text: 'Please enter a complete 10-digit phone number.', type: 'error' });
            return;
        }

        // File Validation
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (!allowedTypes.includes(resumeFile.type)) {
            setMessage({ text: 'Invalid file type. Please upload a PDF, DOC, or DOCX file.', type: 'error' });
            return;
        }
        if (resumeFile.size > maxSize) {
            setMessage({ text: 'File is too large. The maximum size is 5MB.', type: 'error' });
            return;
        }

        // --- If all validation passes ---
        setMessage({ text: 'Thank you for your application! We will be in touch shortly.', type: 'success' });
        formRef.current?.reset();
    };

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg reveal">
                    {message.type && (
                        <div className={`form-message show ${message.type === 'error' ? 'form-error' : 'form-success'}`}>
                            {message.text}
                        </div>
                    )}
                    <form ref={formRef} onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" name="full-name" id="full-name" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="John Doe" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" name="email" id="email" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input ref={phoneInputRef} onInput={handlePhoneInput} type="tel" name="phone" id="phone" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="(555) 555-5555" maxLength={14} />
                            </div>
                            <div>
                                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position Applying For</label>
                                <input type="text" name="position" id="position" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="Geological Analyst" />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
                                <input type="file" name="resume" id="resume" required accept=".pdf,.doc,.docx" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition" />
                                <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX only. Max size: 5MB.</p>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <button type="submit" className="w-full md:w-auto inline-flex justify-center items-center px-12 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}