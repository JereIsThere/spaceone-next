import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './styles.module.css'

const EventFormTest = () => {

    async function create(formData: FormData) {
        'use server'

        console.log(JSON.stringify(formData))

        const response = await fetch('/api/submitEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    }

    return (
        <form action={create} className={styles.eventForm}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    className={styles.input}
                    name="name"
                    // value={""}
                    //   onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    // value={formData.description}
                    //   onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="dateTime">Time and Date:</label>
                <input
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    // value={formData.dateTime}
                    //   onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="checkBox"
                    // checked={formData.checkBox}
                    // onChange={handleInputChange}
                    />
                    Checkbox
                </label>
            </div>
            <div>
                <label
                    // onClick={handleLocationToggle}
                    style={{ cursor: 'pointer' }}>
                    Location
                </label>
                
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EventFormTest;

/* {locationExpanded ? (
                    <div>
                        <label htmlFor="planet">Planet:</label>
                        <input
                            type="text"
                            id="planet"
                            name="planet"
                            value={formData.planet}
                            onFocus={() => setLocationExpanded(true)}
                            onChange={handleInputChange}
                        />
                         Add other location fields here 
                        </div>
                        ) : (
                            <div>
                                <p>Location Summary:</p>
                                <p>{`Planet: ${formData.planet || 'N/A'}`}</p>
                                
                            </div>
                        )} */