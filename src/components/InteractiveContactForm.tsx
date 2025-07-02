import { useState, useRef, type FormEvent } from 'react';

export default function InteractiveContactForm() {
    const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' | null }>({ text: '', type: null });
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
        const subject = formData.get('subject') as string;
        const contactMessage = formData.get('message') as string;

        // Validation
        if (!fullName.trim() || !email.trim() || !phone.trim() || !subject.trim() || !contactMessage.trim()) {
            setMessage({ text: 'All fields are required. Please fill them out and try again.', type: 'error' });
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

        // --- If all validation passes ---
        setMessage({ text: 'Thank you for your message! We will be in touch shortly.', type: 'success' });
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
                                <input onInput={handlePhoneInput} type="tel" name="phone" id="phone" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="(555) 555-5555" maxLength={14} />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input type="text" name="subject" id="subject" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="General Inquiry" />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea id="message" name="message" rows={4} required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition" placeholder="Tell us about your project..."></textarea>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <button type="submit" className="w-full md:w-auto inline-flex justify-center items-center px-12 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}