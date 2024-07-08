export const getAge = (dob: Date): number => {
    const ageDelta = new Date(Date.now() - dob.getTime());
    return Math.abs(ageDelta.getUTCFullYear() - 1970);
}
