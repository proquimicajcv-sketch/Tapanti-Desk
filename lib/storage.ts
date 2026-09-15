const STUDENT_NAME_KEY = "tapanti_student_name";

export const saveStudentName = (name: string) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STUDENT_NAME_KEY, name.trim());
};

export const getStudentName = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(STUDENT_NAME_KEY) ?? "";
};
