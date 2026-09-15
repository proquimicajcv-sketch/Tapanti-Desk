const STUDENT_NAME_KEY = "tapanti_student_name";

export const saveStudentName = (name: string) => {
  localStorage.setItem(STUDENT_NAME_KEY, name.trim());
};

export const getStudentName = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(STUDENT_NAME_KEY) ?? "";
};
