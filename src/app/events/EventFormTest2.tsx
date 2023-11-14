// AddEventForm.tsx
import React, { useState } from 'react';

interface AddEventFormProps {
    onSuccess: () => void;
}

const EventFormTest2: React.FC<AddEventFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        place: {
            planet: '',
            country: '',
            zipCode: '',
            city: '',
            street: '',
            streetNumber: '',
            building: '',
            room: '',
        },
        time: new Date().toISOString(),
        description: '',
        hasTeamsCall: 0,
        name: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            place: {
                ...prevData.place,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/add-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // If the request is successful, trigger the success callback
                onSuccess();
            } else {
                // Handle error response
                console.error('Failed to add event:', response.statusText);
            }
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields for event details */}
            <label htmlFor="name">Event Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

            <label htmlFor="description">Event Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />

            {/* Input fields for location details */}
            <label htmlFor="planet">Planet:</label>
            <input type="text" id="planet" name="planet" value={formData.place.planet} onChange={handleLocationChange} required />

            {/* Add other location fields here (country, zipCode, city, etc.) */}

            {/* Additional event fields */}
            <label htmlFor="hasTeamsCall">Has Teams Call:</label>
            <input type="checkbox" id="hasTeamsCall" name="hasTeamsCall" checked={formData.hasTeamsCall === 1} onChange={handleInputChange} />

            <button type="submit">Add Event</button>
        </form>
    );
};

export default EventFormTest2;
