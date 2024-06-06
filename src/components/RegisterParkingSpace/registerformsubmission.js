export const submitParkingSpace = async (
  values,
  { setSubmitting, resetForm }
) => {
  try {
    const response = await fetch("/api/parkingSpaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values), // Convert form values to JSON
    });

    if (!response.ok) {
      throw new Error(`Error submitting form: ${response.statusText}`); // Handle non-2xx responses
    }

    const data = await response.json();
    console.log("Form submitted successfully:", data);
    resetForm(); // Resets the form after successful submission
  } catch (error) {
    console.error("Error submitting the form:", error);
  } finally {
    setSubmitting(false); // This will set isSubmitting to false
  }
};
