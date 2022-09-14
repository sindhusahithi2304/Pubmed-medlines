/**
 * Enum representing supported export source.
 */
export var ExportSourceType;
(function (ExportSourceType) {
    ExportSourceType[ExportSourceType["None"] = 0] = "None";
    ExportSourceType[ExportSourceType["Result"] = 1] = "Result";
    ExportSourceType[ExportSourceType["Selection"] = 2] = "Selection";
    ExportSourceType[ExportSourceType["SavedQuery"] = 4] = "SavedQuery";
})(ExportSourceType || (ExportSourceType = {}));
/**
 * Enum representing supported export format.
 */
export var ExportOutputFormat;
(function (ExportOutputFormat) {
    ExportOutputFormat[ExportOutputFormat["None"] = 0] = "None";
    ExportOutputFormat[ExportOutputFormat["Csv"] = 1] = "Csv";
    ExportOutputFormat[ExportOutputFormat["Xlsx"] = 2] = "Xlsx";
    ExportOutputFormat[ExportOutputFormat["Json"] = 4] = "Json";
})(ExportOutputFormat || (ExportOutputFormat = {}));
/**
 * The minimum server api version that compatible with this version of SBA.
 */
export const MINIMUM_COMPATIBLE_SERVER_API_VERSION = '1.0';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NhcHAuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS93ZWItc2VydmljZXMvIiwic291cmNlcyI6WyJjb25maWcvY2NhcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMmlCQTs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGdCQUtYO0FBTEQsV0FBWSxnQkFBZ0I7SUFDeEIsdURBQVEsQ0FBQTtJQUNSLDJEQUFVLENBQUE7SUFDVixpRUFBYSxDQUFBO0lBQ2IsbUVBQWMsQ0FBQTtBQUNsQixDQUFDLEVBTFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUszQjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksa0JBS1g7QUFMRCxXQUFZLGtCQUFrQjtJQUMxQiwyREFBUSxDQUFBO0lBQ1IseURBQU8sQ0FBQTtJQUNQLDJEQUFRLENBQUE7SUFDUiwyREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUxXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFLN0I7QUFzS0Q7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxxQ0FBcUMsR0FBRyxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcE9mLCBKc29uT2JqZWN0LCBQYXR0ZXJuTWF0Y2hlcn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgZmllbGRzIGF2YWlsYWJsZSBpbiBhbGwgY29uZmlndXJhdGlvbiBvYmplY3RzLiBCeSBjb252ZW50aW9uLCBjb25maWd1cmF0aW9uIG9iamVjdFxuICogaW50ZXJmYWNlcyBhcmUgcHJlZml4ZWQgYnkgYENDYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ0NvbmZpZyB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFuIG9wdGlvbmFsIGRlc2NyaXB0aW9uIG9mIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgZmllbGRzIGF2YWlsYWJsZSBpbiBhbGwgd2ViIHNlcnZpY2UgY29uZmlndXJhdGlvbiBvYmplY3RzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ0NXZWJTZXJ2aWNlIGV4dGVuZHMgQ0NDb25maWcge1xuICAgIHdlYlNlcnZpY2VUeXBlOiBcIlF1ZXJ5XCIgfCBcInNwb25zb3JlZGxpbmtzXCIgfCBcInF1ZXJ5ZXhwb3J0XCIgfCBcIlByZXZpZXdcIiB8IFwiTGFiZWxzXCIgfCBcIkF1dG9jb21wbGV0ZVwiIHwgXCJEYXRhU2V0XCI7XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBmaWVsZHMgYXZhaWxhYmxlIGluIHRoZSBpbmRleCBjb25maWd1cmF0aW9uIG9iamVjdFxuICovXG5leHBvcnQgaW50ZXJmYWNlIENDSW5kZXggZXh0ZW5kcyBDQ0NvbmZpZyB7XG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGluZGV4XG4gICAgICovXG4gICAgaW5kZXhUeXBlOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbHVtbnMgaW4gdGhlIGluZGV4XG4gICAgICovXG4gICAgY29sdW1ucz86IE1hcE9mPENDQ29sdW1uPjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGZpZWxkcyBhdmFpbGFibGUgaW4gYSBsaXN0IGl0ZW0gY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ0xpc3RJdGVtIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBpcyB1c2VkIHRvIGRpc3BsYXkgYW4gaXRlbVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgaG9sZHMgdGhlIHVuZGVybHlpbmcgdmFsdWUgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIGxpc3QgY29uZmlndXJhdGlvbiBvYmplY3QuIExpc3RzIGNhbiBiZSBjcmVhdGVkIGluIGBBcHAgRGVwZW5kZW5jaWVzL0xpc3RzYCBpbiB0aGUgYWRtaW4gaW50ZXJmYWNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENDTGlzdCBleHRlbmRzIENDQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgbGlzdFxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgaXRlbXMgaW4gdGhlIGxpc3RcbiAgICAgKi9cbiAgICBpdGVtczogQ0NMaXN0SXRlbVtdO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhbiBSRk0gYWN0aW9uIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ0NSRk1BY3Rpb24ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBlbmFibGVkOiBib29sZWFuO1xuICAgIGFjdGlvbkVuYWJsZWQ6IGJvb2xlYW47XG4gICAgbm9NZW51OiBib29sZWFuO1xuICAgIGRpc3BsYXlVbnJhdGVkOiBib29sZWFuO1xuICAgIG5lZ0F2YWlsYWJsZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYW4gUkZNIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ0NSRk0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjbGljazogQ0NSRk1BY3Rpb247XG4gICAgbGlrZTogQ0NSRk1BY3Rpb247XG4gICAgaW1wb3J0YW50OiBDQ1JGTUFjdGlvbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYW4gYWdncmVnYXRpb24gY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ0FnZ3JlZ2F0aW9uIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYWdncmVnYXRpb25cbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIHVuZGVybHlpbmcgY29sdW1uIGluIHRoZSBhZ2dyZWdhdGlvblxuICAgICAqL1xuICAgIGNvbHVtbjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGlzIGFnZ3JlZ2F0aW9uIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBhIHJlZ3VsYXIgc2VhcmNoXG4gICAgICovXG4gICAgaW5jbHVkZUluU3RhbmRhcmRTZWFyY2g6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcyB0byByZXRyaWV2ZVxuICAgICAqL1xuICAgIGNvdW50OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9mIHRoZSBgb3JkZXJgIGNsYXVzZVxuICAgICAqL1xuICAgIG9yZGVyOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9mIHRoZSBgbWFza2AgY2xhdXNlXG4gICAgICovXG4gICAgbWFzazogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIGFuIGFzc29jaWF0ZWQgZGlzdHJpYnV0aW9uIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgZGlzdHJpYnV0aW9uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBhZ2dyZWdhdGlvbiBpcyByZXF1ZXN0ZWQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB0YWIgb3IgZ2xvYmFsbHkuXG4gICAgICogVGhlIGRlZmF1bHQgaXMgdG8gcmVzcGVjdCB0aGUgW0NDVGFiU2VhcmNoLmxvYWRBZ2dyZWdhdGlvbnNGb3JTZWxlY3RlZFRhYl17QGxpbmsgQ0NUYWJTZWFyY2gjbG9hZEFnZ3JlZ2F0aW9uc0ZvclNlbGVjdGVkVGFifSBzZXR0aW5nXG4gICAgICovXG4gICAgdGFiQmVoYXZpb3I6IFwiXCIgfCBcIkRlZmF1bHRcIiB8IFwiTG9hZEZvclNlbGVjdGVkVGFiXCIgfCBcIkxvYWRGb3JBbGxUYWJzXCI7XG4gICAgLyoqXG4gICAgICogVGhlIHNlcGFyYXRvciB1c2VkIGZvciBjcm9zc2VkIGFnZ3JlZ2F0aW9uc1xuICAgICAqL1xuICAgIGtleVNlcGFyYXRvcjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBkaXNwbGF5IHNlcGFyYXRvciB1c2VkIGZvciBjcm9zc2VkIGFnZ3JlZ2F0aW9uc1xuICAgICAqL1xuICAgIGRpc3BsYXlLZXlTZXBhcmF0b3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGZpZWxkcyBmb3IgYSB0YWIgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ1RhYiB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHRhYlxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgdGFiXG4gICAgICovXG4gICAgZGlzcGxheTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZXMgaW4gdGhlIHRhYiBkaXN0cmlidXRpb24gdGhhdCBjb250cmlidXRlIHRvIHRoaXMgdGFiXG4gICAgICovXG4gICAgdmFsdWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBTZXQgaWYgdGhpcyB0YWIgaXMgdGhlIGRlZmF1bHQgdG8gYmUgdXNlZCB3aGVuIG5vIHRhYiBpcyBzcGVjaWZpZWQgaW4gYSBxdWVyeVxuICAgICAqL1xuICAgIGlzRGVmYXVsdDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBJbmRleGVzIHRvIGV4Y2x1ZGUgd2hlbiBleGVjdXRpbmcgYSBxdWVyeSB3aXRoIHRoaXMgdGFiIHNlbGVjdGVkXG4gICAgICovXG4gICAgZXhjbHVkZWRJbmRpY2VzOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQWdncmVnYXRpb25zIHRvIGV4Y2x1ZGUgd2hlbiBleGVjdXRpbmcgYSBxdWVyeSB3aXRoIHRoaXMgdGFiIHNlbGVjdGVkXG4gICAgICovXG4gICAgZXhjbHVkZWRBZ2dyZWdhdGlvbnM6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBSZXN1bHRzIHNvcnRpbmcgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSBhdmFpbGFibGUgd2hlbiBleGVjdXRpbmcgYSBxdWVyeSB3aXRoIHRoaXMgdGFiIHNlbGVjdGVkXG4gICAgICovXG4gICAgc29ydGluZ0Nob2ljZXM6IENDU29ydGluZ0Nob2ljZVtdO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgZmllbGRzIGZvciB0aGUgdGFiIHNlYXJjaCBjb25maWd1cmF0aW9uIGluIGEgcXVlcnkuIEEgdGFiIHNlYXJjaCBkZWZpbmVzIGEgc3BlY2lhbCBkaXN0cmlidXRpb24gd2hpY2ggaXMgZXZhbHVhdGVkXG4gKiBhcyBhIHBhcnQgb2YgcXVlcnkgdG8gZ3JvdXAgdGhlIHJlc3VsdHMgYnkgYSBzZXQgb2YgdGFiIGl0ZW1zLiBUaGUgZGlzdHJpYnV0aW9uIGdpdmVzIHRoZSBjb3VudCBvZiBkb2N1bWVudHNcbiAqIGFzc29jaWF0ZWQgd2l0aCBlYWNoIHRhYiBpdGVtLiBUaGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHRhYiBpdGVtIGFyZSB1c2VkIHRvIGZpbHRlciBhIHF1ZXJ5IHdoZW4gYSB0YWIgaXRlbSBpcyBzZWxlY3RlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ1RhYlNlYXJjaCB7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgdGFiIHNlYXJjaCBpcyB1c2VkIGluIGEgcXVlcnlcbiAgICAgKi9cbiAgICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBjb2x1bW4gdG8gYmUgdXNlZCBpbiB0aGUgdGFiIGRpc3RyaWJ1dGlvbiBhbmQgZm9yIGZpbHRlcmluZyByZXN1bHRzIGJ5IGEgc2VsZWN0ZWQgdGFiIGl0ZW1cbiAgICAgKi9cbiAgICBjb2x1bW46IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBgdHJ1ZWAgaWYgdGhlIGFzc29jaWF0ZWQgY29sdW1uIGlzIGEgdHJlZVxuICAgICAqL1xuICAgIGNvbHVtbklzVHJlZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG92ZXJhbGwgZG9jdW1lbnQgdG90YWwgc2hvdWxkIGJlIGNhbGN1bGF0ZWQgZnJvbSB0aGUgcGVyLXRhYiBpdGVtIGRvY3VtZW50cyB0b3RhbHNcbiAgICAgKi9cbiAgICB0b3RhbElzU3VtT2ZUYWJUb3RhbHM6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIGNvbmZpZ3VyZWQgYWdncmVnYXRpb25zIHNob3VsZCBiZSBldmFsdWF0ZWQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIHNlbGVjdGVkIHRhYiBvciBub3QuXG4gICAgICogVGhpcyBzZXR0aW5nIGNhbiBiZSBvdmVycmlkZGVuIGF0IHRoZSB0YWIgaXRlbSBsZXZlbCB1c2luZyBbQ0NUYWIuZXhjbHVkZWRBZ2dyZWdhdGlvbnNde0BsaW5rIENDVGFiI2V4Y2x1ZGVkQWdncmVnYXRpb25zfVxuICAgICAqL1xuICAgIGxvYWRBZ2dyZWdhdGlvbnNGb3JTZWxlY3RlZFRhYjogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHRoZSBgbWlubGV2ZWxgIHZhbHVlIHRvIHVzZSB3aGVuIGV2YWx1YXRpbmcgdGhlIHRhYiBkaXN0cmlidXRpb24gZm9yIGEgdHJlZSBjb2x1bW5cbiAgICAgKi9cbiAgICB2YWx1ZUxldmVsczogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciBgcG9zdC1ncm91cC1ieT10cnVlYCBzaG91bGQgYmUgdXNlZCBpbiB0aGUgdGFiIGRpc3RyaWJ1dGlvblxuICAgICAqL1xuICAgIHBvc3RHcm91cEJ5OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciAnbWVyZ2UtZ3JvdXBzPXRydWVgIHNob3VsZCBiZSB1c2VkIGluIHRoZSB0YWIgZGlzdHJpYnV0aW9uLiBUaGlzIGlzIG9ubHkgdXNlZCBpZiBgcG9zdEdyb3VwQnlgIGlzIHNldCB0byBgdHJ1ZWBcbiAgICAgKi9cbiAgICBtZXJnZUdyb3VwczogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgc2V0IG9mIGNvbmZpZ3VyZWQgdGFiIGl0ZW1zXG4gICAgICovXG4gICAgdGFiczogQ0NUYWJbXTtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSBzb3J0aW5nIGNob2ljZSB3aGljaCBjYW4gYmUgc2VsZWN0ZWQgZm9yIGEgcXVlcnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ1NvcnRpbmdDaG9pY2Uge1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgc29ydGluZyBjaG9pY2VcbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIG9mIHRoaXMgc29ydGluZyBjaG9pY2VcbiAgICAgKi9cbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBkaXNwbGF5IHZhbHVlIHRvIHVzZSB3aGVuIHJlbmRlcmluZyB0aGlzIHNvcnRpbmcgY2hvaWNlXG4gICAgICovXG4gICAgZGlzcGxheTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBgT1JERVIgQllgIGNsYXVzZSB0byB1c2Ugd2hlbiB0aGlzIHNvcnRpbmcgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAgICovXG4gICAgb3JkZXJCeUNsYXVzZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGlzIHNvcnRpbmcgY2hvaWNlIHNob3VsZCBiZSB1c2VkIGFzIHRoZSBkZWZhdWx0IHdoZW5cbiAgICAgKiB0aGUgcXVlcnkgaGFzIG5vIGB0ZXh0IGNvbnRhaW5zYCBjbGF1c2VcbiAgICAgKi9cbiAgICBpc0RlZmF1bHROb1JlbGV2YW5jZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhpcyBzb3J0aW5nIGNob2ljZSBzaG91bGQgYmUgdXNlZCBhcyB0aGUgZGVmYXVsdCB3aGVuXG4gICAgICogdGhlIHF1ZXJ5IGhhcyBhIGB0ZXh0IGNvbnRhaW5zYCBjbGF1c2VcbiAgICAgKi9cbiAgICBpc0RlZmF1bHRXaXRoUmVsZXZhbmNlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIHNjb3BlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LiBBIHNjb3BlIGRlZmluZXMgYSBzZXQgb2YgY29uZGl0aW9ucyB3aGljaFxuICogd2lsbCBiZSBhZGRlZCB0byB0aGUgcXVlcnkgYHdoZXJlIGNsYXVzZWAgd2hlbiB0aGUgc2NvcGUgaXMgc2VsZWN0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ1Njb3BlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgc2NvcGVcbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBzY29wZVxuICAgICAqL1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGRpc3BsYXkgdmFsdWUgdG8gYmUgdXNlZCB3aGVuIHJlbmRlcmluZyB0aGUgc2NvcGVcbiAgICAgKi9cbiAgICBkaXNwbGF5OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzY29wZSBpcyBhY3RpdmUgb3Igbm90XG4gICAgICovXG4gICAgaXNBY3RpdmU6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzY29wZSBzaG91bGQgYmUgY29uc2lkZXJlZCB0aGUgZGVmYXVsdCBzY29wZVxuICAgICAqIHdoZW4gYSBzY29wZSBpcyBub3Qgc3BlY2lmaWVkIGluIGEgcXVlcnlcbiAgICAgKi9cbiAgICBpc0RlZmF1bHQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogRGVmaW5lcyBkaWZmZXJlbnQgcHJlY2lzaW9uIG9wZXJhdG9ycyB0aGF0IGNhbiBiZSBhdXRvbWF0aWNhbGx5IGFkZGVkIHRvIGEgYHRleHQgY29udGFpbnNgIGNsYXVzZVxuICogd2hlbiBubyBwcmVjaXNpb24gb3BlcmF0b3JzIGFyZSBwcmVzZW50LlxuICpcbiAqIGBEZWZhdWx0YCAtIG5vIG9wZXJhdG9ycyBhcmUgYWRkZWRcbiAqXG4gKiBgRXhhY3RFeHByZXNzaW9uYCAtIHRleHQgc3Vycm91bmRlZCBieSBgXCIuLi5cImBcbiAqXG4gKiBgSW5UaGVTYW1lUGhyYXNlYCAtIHRleHQgc3Vycm91bmRlZCBieSBgWy4uLl1gXG4gKlxuICogYEV2ZXJ5V29yZGAgLSB0ZXh0IHN1cnJvdW5kZWQgYnkgYCsoLi4uKWBcbiAqL1xuZXhwb3J0IHR5cGUgUXVlcnlQcmVjaXNpb24gID0gXCJEZWZhdWx0XCIgfCBcIkV4YWN0RXhwcmVzc2lvblwiIHwgXCJJblRoZVNhbWVQaHJhc2VcIiB8IFwiRXZlcnlXb3JkXCI7XG5cbi8qKlxuICogRGVmaW5lcyBzdHJhdGVnaWVzIHRoYXQgY2FuIHVzZWQgaW4gdGhlIHF1ZXJ5IHNlYXJjaCBwYXJhbWV0ZXJzLiBFYWNoIHN0cmF0ZWd5IGRlZmluZXMgYSBwYWlyIG9mIHdvcmQgd2VpZ2h0IChgd3dgKSBhbmQgbWVhbmluZ1xuICogd2VpZ2h0IChgbXdgKSB2YWx1ZXMgdG8gYmUgdXNlZC5cbiAqXG4gKiBgRGVmYXVsdGAgLSBubyBgd3dgIGFuZCBgbXdgIHBhcmFtZXRlcnMgdXNlZFxuICpcbiAqIGBXb3Jkc09ubHlgIC0gYHd3PTE7bXc9MGBcbiAqXG4gKiBgV29yZHNGaXJzdGAgLSBgd3c9MC44O213PTAuMmBcbiAqXG4gKiBgV29yZHNBbmRNZWFuaW5nYCAtIGB3dz0wLjY7bXc9MC40YFxuICpcbiAqIGBNZWFuaW5nRmlyc3RgIC0gYHd3PTAuMzttdz0wLjdgXG4gKlxuICogYE1lYW5pbmdPbmx5YCAtIGB3dz0wO213PTFgXG4gKi9cbmV4cG9ydCB0eXBlIFF1ZXJ5U3RyYXRlZ3kgPSBcIkRlZmF1bHRcIiB8IFwiV29yZHNPbmx5XCIgfCBcIldvcmRzRmlyc3RcIiB8IFwiV29yZHNBbmRNZWFuaW5nXCIgfCBcIk1lYW5pbmdGaXJzdFwiIHwgXCJNZWFuaW5nT25seVwiO1xuXG4vKipcbiAqIERlZmluZXMgbW9kZXMgZm9yIHRoZSBzcGVsbGluZyBjb3JyZWN0aW9uIG9mIHNlYXJjaCB0ZXJtcyBhbmQgZGlkLXlvdS1tZWFuIGZ1bmN0aW9uYWxpdHkuIENvcnJlY3Rpb25zXG4gKiBhcmUgYmFzZWQgb24gZWRpdCBhbmQgcGhvbmV0aWMgZGlzdGFuY2UgYW5kIGV4aXN0IGFtb25nIHRoZSBzZWFyY2hlZCBkb2N1bWVudHNcbiAqXG4gKiBgZGVmYXVsdCB8IGNsYXNzaWNgIC0gY29ycmVjdGlvbnMgYXJlIHNvdWdodCBmb3IgdGVybXMgdGhhdCBhcmUgbm90IHByZXNlbnQgaW4gYW55IGRvY3VtZW50cy4gVGhlIG9yaWdpbmFsIHRlcm1zXG4gKiBhbmQgY29ycmVjdGlvbnMgYXJlIGluY2x1ZGVkIGluIHRoZSBxdWVyeVxuICpcbiAqIGBzbWFydGAgLSBjb3JyZWN0aW9ucyBhcmUgc291Z2h0IGZvciB0ZXJtcyB0aGF0IGFyZSBwcmVzZW50IGluIGxlc3MgdGhhbiAxMCBkb2N1bWVudHMgYW5kIHdoZXJlIHRoZSBjb3JyZWN0aW9uXG4gKiBpcyAyMCB0aW1lcyBtb3JlIGZyZXF1ZW50IHRoYW4gdGhlIG9yaWdpbmFsIHRlcm0uIE9ubHkgdGhlIGJlc3QgY29ycmVjdGlvbnMgYXJlIGtlcHQuIFRoZSBvcmlnaW5hbCB0ZXJtcyBhbmQgY29ycmVjdGlvbnNcbiAqIGFyZSBpbmNsdWRlZCBpbiB0aGUgcXVlcnkuIFRoZSBbUmVzdWx0cy5kaWRZb3VNZWFuXXtAbGluayBSZXN1bHRzI2RpZFlvdU1lYW5dIG1lbWJlciBpcyBwb3B1bGF0ZWQgYWxsb3dpbmcgZm9yIGEgXCJXZSBpbmNsdWRlZFxuICogcmVzdWx0cyBmb3IgdGhlc2UgdGVybXMuLi5cIiBmZWVkYmFjayB0byBiZSBkaXNwbGF5ZWRcbiAqXG4gKiBgY29ycmVjdGAgLSBjb3JyZWN0aW9ucyBhcmUgc291Z2h0IGZvciB0ZXJtcyB0aGF0IGFyZSBwcmVzZW50IGluIGxlc3MgdGhhbiAxMCBkb2N1bWVudHMgYW5kIHdoZXJlIHRoZSBjb3JyZWN0aW9uIGlzXG4gKiAyMCB0aW1lcyBtb3JlIGZyZXF1ZW50IHRoYW4gdGhlIG9yaWdpbmFsIHRlcm0uIE9ubHkgdGhlIGJlc3QgY29ycmVjdGlvbnMgYXJlIGtlcHQuIFRoZSBvcmlnaW5hbCB0ZXJtcyB0aGF0IGhhdmUgY29ycmVjdGlvbnNcbiAqIGFyZSBub3QgaW5jbHVkZWQgaW4gdGhlIHF1ZXJ5LiBUaGUgW1Jlc3VsdHMuZGlkWW91TWVhbl17QGxpbmsgUmVzdWx0cyNkaWRZb3VNZWFuXSBtZW1iZXIgaXMgcG9wdWxhdGVkIGFsbG93aW5nIGZvciBhIFwiWW91ciBxdWVyeVxuICogaGFzIGJlZW4gY29ycmVjdGVkIHRvLi4uXCIgZmVlZGJhY2sgdG8gYmUgZGlzcGxheWVkXG4gKlxuICogYGR5bW9ubHlgIC0gY29ycmVjdGlvbnMgYXJlIHNvdWdodCBmb3IgdGVybXMgdGhhdCBhcmUgcHJlc2VudCBpbiBsZXNzIHRoYW4gMTAgZG9jdW1lbnRzIGFuZCB3aGVyZSB0aGUgY29ycmVjdGlvbiBpc1xuICogMjAgdGltZXMgbW9yZSBmcmVxdWVudCB0aGFuIHRoZSBvcmlnaW5hbCB0ZXJtLiBUaGUgYWN0dWFsIHF1ZXJ5IGlzIHVuYWZmZWN0ZWQgYnV0IHRoZVxuICogW1Jlc3VsdHMuZGlkWW91TWVhbl17QGxpbmsgUmVzdWx0cyNkaWRZb3VNZWFuXSBtZW1iZXIgd2lsbCBiZSBwb3B1bGF0ZWQgYWxsb3dpbmcgZm9yIGEgXCJEaWQgeW91IG1lYW4uLi5cIiBmZWVkYmFjayB0byBiZVxuICogZGlzcGxheWVkXG4gKlxuICogYGZvcmNlYCAtIGNvcnJlY3Rpb25zIGFyZSBzb3VnaHQgZm9yIGFsbCB0ZXJtcy4gQWxsIHRlcm1zIGFuZCBjb3JyZWN0aW9ucyBhcmUgaW5jbHVkZWQgaW4gdGhlIHF1ZXJ5XG4gKlxuICogYGZhbHNlYCAtIG5vIHNwZWxsaW5nIGNvcnJlY3Rpb24gcHJvY2Vzc2luZyBvY2N1cnNcbiAqL1xuZXhwb3J0IHR5cGUgU3BlbGxpbmdDb3JyZWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiIHwgXCJjbGFzc2ljXCIgfCBcInNtYXJ0XCIgfCBcImNvcnJlY3RcIiB8IFwiZHltb25seVwiIHwgXCJmb3JjZVwiIHwgXCJmYWxzZVwiO1xuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgcXVlcnkgd2ViIHNlcnZpY2UgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ1F1ZXJ5IGV4dGVuZHMgQ0NXZWJTZXJ2aWNlIHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgcmVjb3JkcyBvciBkb2N1bWVudHMgdG8gcmVxdWVzdCB3aGVuIGV4ZWN1dGluZyB0aGUgcXVlcnlcbiAgICAgKi9cbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGFnZ3JlZ2F0aW9ucyB0aGF0IHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgcXVlcnlcbiAgICAgKi9cbiAgICBhZ2dyZWdhdGlvbnM6IENDQWdncmVnYXRpb25bXTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gZm9yIHRoZSBjb2x1bW5zIGluIHRoZSBpbmRleGVzXG4gICAgICovXG4gICAgY29sdW1uc0luZm86IENDQ29sdW1uc0luZm87XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgc29ydGluZyBjaG9pY2VzIHRoYXQgY2FuIGJlIHVzZWRcbiAgICAgKi9cbiAgICBzb3J0aW5nQ2hvaWNlczogQ0NTb3J0aW5nQ2hvaWNlW107XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgc2NvcGVzIHRoYXQgY2FuIGJlIHVzZWRcbiAgICAgKi9cbiAgICBzY29wZXM6IENDU2NvcGVbXTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgc2NvcGVzIHByb2Nlc3NpbmcgaXMgYWN0aXZhdGVkIGZvciB0aGlzIHF1ZXJ5XG4gICAgICovXG4gICAgc2NvcGVzQWN0aXZlOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHNwZWxsaW5nIGNvcnJlY3Rpb24gbW9kZSBmb3IgdGhpcyBxdWVyeVxuICAgICAqL1xuICAgIHNDTW9kZTogU3BlbGxpbmdDb3JyZWN0aW9uTW9kZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBkaXN0YW5jZSB0byB1c2UgZm9yIHRoZSBgTkVBUmAgb3BlcmF0b3Igd2hlbiBubyB2YWx1ZSBpcyBzcGVjaWZpZWRcbiAgICAgKi9cbiAgICBkZWZhdWx0TmVhclZhbHVlOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgdGFiIHNlYXJjaCBjb25maWd1cmF0aW9uIGZvciB0aGlzIHF1ZXJ5XG4gICAgICovXG4gICAgdGFiU2VhcmNoOiBDQ1RhYlNlYXJjaDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBbQ0NSRk1de0BsaW5rIENDUkZNfSBjb25maWd1cmF0aW9uIGZvciB0aGlzIHF1ZXJ5XG4gICAgICovXG4gICAgckZNOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgZGVmYXVsdCBsYW5ndWFnZSB0byB1c2Ugd2hlbiBwYXJzaW5nIHRoZSBxdWVyeSB0ZXh0XG4gICAgICovXG4gICAgcXVlc3Rpb25MYW5ndWFnZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGRlZmF1bHQgcHJlY2lzaW9uIHRvIHVzZSBmb3IgdGhpcyBxdWVyeVxuICAgICAqL1xuICAgIHF1ZXN0aW9uUHJlY2lzaW9uOiBRdWVyeVByZWNpc2lvbjtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBkZWZhdWx0IHN0cmF0ZWd5IHRvIHVzZSBmb3IgdGhpcyBxdWVyeVxuICAgICAqL1xuICAgIHF1ZXN0aW9uU3RyYXRlZ3k6IFF1ZXJ5U3RyYXRlZ3k7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgaW5kZXhlcyB0aGF0IHRoZSBxdWVyeSBzZWxlY3RzIGZyb21cbiAgICAgKi9cbiAgICBzZWFyY2hJbmRleGVzOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIGZpbHRlci1sZXNzIHF1ZXJpZXMgYXJlIHBlcm1pdHRlZFxuICAgICAqL1xuICAgIGFsbG93RW1wdHlTZWFyY2g6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgcGF0dGVybnMgdG8gY29udHJvbCB3aGljaCBjb2x1bW4gZmllbGRzIGFyZSBhbGxvd2VkXG4gICAgICogaW4gZmllbGRlZCBzZWFyY2ggZXhwcmVzc2lvbnMuXG4gICAgICovXG4gICAgY29sdW1uRmllbGRzSW5jbHVkZWQ6IHN0cmluZ1tdO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHBhdHRlcm5zIHRvIGNvbnRyb2wgd2hpY2ggY29sdW1uIGZpZWxkcyBhcmUgZGlzYWxsb3dlZFxuICAgICAqIGluIGZpZWxkZWQgc2VhcmNoIGV4cHJlc3Npb25zLlxuICAgICAqL1xuICAgIGNvbHVtbkZpZWxkc0V4Y2x1ZGVkOiBzdHJpbmdbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgYFBhdHRlcm5NYXRjaGVyYCBpbnN0YW5jZSBjcmVhdGVkIG9uIHRoZSBjbGllbnQgdXNpbmcgdGhlIGBjb2x1bW5GaWVsZHNJbmNsdWRlZGAgYW5kIGBjb2x1bW5GaWVsZHNFeGNsdWRlZGAgdmFsdWVzLlxuICAgICAqL1xuICAgICRjb2x1bW5GaWVsZHNQYXR0ZXJuOiBQYXR0ZXJuTWF0Y2hlcjtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBwYXR0ZXJucyB0byBjb250cm9sIHdoaWNoIHBhcnQgbmFtZSBmaWVsZHMgYXJlIGFsbG93ZWRcbiAgICAgKiBpbiBmaWVsZGVkIHNlYXJjaCBleHByZXNzaW9ucy5cbiAgICAgKi9cbiAgICBwYXJ0bmFtZUZpZWxkc0luY2x1ZGVkOiBzdHJpbmdbXTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBwYXR0ZXJucyB0byBjb250cm9sIHdoaWNoIHBhcnQgbmFtZSBmaWVsZHMgYXJlIGRpc2FsbG93ZWRcbiAgICAgKiBpbiBmaWVsZGVkIHNlYXJjaCBleHByZXNzaW9ucy5cbiAgICAgKi9cbiAgICBwYXJ0bmFtZUZpZWxkc0V4Y2x1ZGVkOiBzdHJpbmdbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgYFBhdHRlcm5NYXRjaGVyYCBpbnN0YW5jZSBjcmVhdGVkIG9uIHRoZSBjbGllbnQgdXNpbmcgdGhlIGBwYXJ0bmFtZUZpZWxkc0luY2x1ZGVkYCBhbmQgYHBhcnRuYW1lRmllbGRzRXhjbHVkZWRgIHZhbHVlcy5cbiAgICAgKi9cbiAgICAkcGFydG5hbWVGaWVsZHNQYXR0ZXJuOiBQYXR0ZXJuTWF0Y2hlcjtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBmb3IgYSBjb2x1bW5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ0NvbHVtbkluZm8ge1xuICAgIC8qKlxuICAgICAqIFRoZSBjb2x1bW4gbmFtZVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBIGRlc2NyaXB0aW9uIG9mIHRoZSBjb2x1bW5cbiAgICAgKi9cbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgYWxpYXNlcyBmb3IgdGhlIGNvbHVtblxuICAgICAqL1xuICAgIGFsaWFzZXM6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBIGRpc3BsYXkgbGFiZWwgZm9yIHRoZSBjb2x1bW5cbiAgICAgKi9cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEEgcGx1cmFsIGZvcm0gZGlzcGxheSBsYWJlbCBmb3IgdGhlIGNvbHVtblxuICAgICAqL1xuICAgIGxhYmVsUGx1cmFsOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgYSBmb3JtYXR0ZXIgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBhIGZvcm1hdHRlZCBzdHJpbmcgdmFsdWUgZnJvbSB0aGUgY29sdW1uIHZhbHVlLiBTZWUge0BsaW5rIEZvcm1hdFNlcnZpY2V9XG4gICAgICovXG4gICAgZm9ybWF0dGVyOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQSBzZXQgb2YgdHJhbnNmb3JtIGZ1bmN0aW9ucyB0aGF0IGFyZSBhcHBsaWVkIHRvIHRoZSBhIGZvcm1hdHRlZCBzdHJpbmcgdmFsdWUuIFNlZSB7QGxpbmsgRm9ybWF0U2VydmljZX1cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm1zOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgYSBwYXJzZXIgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBhIGNvbHVtbiB2YWx1ZSBmcm9tIGEgZm9ybWF0dGVkIHN0cmluZyB2YWx1ZS4gU2VlIHtAbGluayBGb3JtYXRTZXJ2aWNlfVxuICAgICAqL1xuICAgIHBhcnNlcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIHNldCBvZiBgQ0NDb2x1bW5JbmZvYCBvYmplY3RzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ0NDb2x1bW5zSW5mbyB7XG4gICAgY29sdW1uczogQ0NDb2x1bW5JbmZvW107XG59XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgcmFuZ2Ugb2YgY29sdW1uIHR5cGVzIGZvciBhIGNvbHVtblxuICovXG5leHBvcnQgY29uc3QgZW51bSBFbmdpbmVUeXBlIHtcbiAgICBub25lID0gMCxcbiAgICBib29sID0gMSxcbiAgICBkYXRlID0gMixcbiAgICBkYXRlVGltZSA9IDMsXG4gICAgdGltZSA9IDQsXG4gICAgdW5zaWduZWQgPSA1LFxuICAgIGludGVnZXIgPSA2LFxuICAgIGZsb2F0ID0gNyxcbiAgICBkb3VibGUgPSA4LFxuICAgIGRhdGVzID0gOSxcbiAgICBkYXRlVGltZXMgPSAxMCxcbiAgICB0aW1lcyA9IDExLFxuICAgIHZhcmNoYXIgPSAxMixcbiAgICBiaW5hcnkgPSAxMyxcbiAgICBzdHJpbmcgPSAxNCxcbiAgICBjc3YgPSAxNVxufVxuXG4vKipcbiAqIERlZmluZXMgdGhlIHR5cGUgbW9kaWZpZXJzIHRoYXQgY2FuIGJlIHVzZWQgZm9yIGEgY29sdW1uXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEVuZ2luZVR5cGVNb2RpZmllciB7XG4gICAgbm9uZSAgPSAweDAwMDAwMDAsXG4gICAgYSAgICAgPSAweDAwMDA4MDUsIC8vIGEgLT4gbGNcbiAgICAvLyBiICA9IDB4MDAwMDAwMixcbiAgICBjICAgICA9IDB4MDAwMDAwNCxcbiAgICBkICAgICA9IDB4MDAwMDAwOCxcbiAgICBlICAgICA9IDB4MDAwMDgxNCwgLy8gZSAtPiBsY1xuICAgIC8vIGYgID0gMHgwMDAwMDIwLFxuICAgIC8vIGcgID0gMHgwMDAwMDQwLFxuICAgIC8vIGggID0gMHgwMDAwMDgwLFxuICAgIGkgICAgID0gMHgwMDAwMTAwLFxuICAgIC8vIGogID0gMHgwMDAwMjAwLFxuICAgIC8vIGsgID0gMHgwMDAwNDAwLFxuICAgIGwgICAgID0gMHgwMDAwODA0LCAvLyBsIC0+IGNcbiAgICAvLyBtICA9IDB4MDAwMTAwMCxcbiAgICBuICAgICA9IDB4MDAwMjAwMCxcbiAgICAvLyBvICA9IDB4MDAwNDAwMCxcbiAgICAvLyBwICA9IDB4MDAwODAwMCxcbiAgICAvLyBxICA9IDB4MDAxMDAwMCxcbiAgICAvLyByICA9IDB4MDAyMDAwMCxcbiAgICAvLyBzICA9IDB4MDA0MDAwMCxcbiAgICB0ICAgICA9IDB4MDA4MDAwNCwgLy8gdCAtPiBjXG4gICAgLy8gdSAgPSAweDAxMDAwMDAsXG4gICAgLy8gdiAgPSAweDAyMDAwMDAsXG4gICAgLy8gdyAgPSAweDA0MDAwMDAsXG4gICAgeCAgICAgPSAweDA4MDAwMDAsXG4gICAgLy8geSAgPSAweDEwMDAwMDAsXG4gICAgeiAgICAgPSAweDIwMDAwMDAsXG5cbiAgICBmX29yZGluYWwgICAgPSAweDAwMDIwMDAsIC8vICAgICAgICAgICAgIG5cbiAgICBmX211bHRpZGF0ZXMgPSAweDAwMDIwMDAsIC8vICAgICAgICAgICAgIG5cbiAgICBmX3ZhcmNoYXIgICAgPSAweDIwMDAwMDAsIC8vICAgICAgICAgICAgICAgICAgIHpcbiAgICBmX2JpbmFyeSAgICAgPSAweDIwMDIwMDAsIC8vICAgICAgICAgICAgIG4gICAgIHpcbiAgICBmX3N0cmluZyAgICAgPSAweDIwMDIxMDgsIC8vICAgICBkICAgaSAgIG4gICAgIHpcbiAgICBmX2NzdiAgICAgICAgPSAweDI4ODI5MWQsIC8vIGEgYyBkIGUgaSBsIG4gdCB4IHpcblxuICAgIGZfb3ZlcnJpZGFibGU9IDB4MjAwMDEwOCAgLy8gICAgIGQgICBpICAgICAgICAgelxufVxuXG4vKipcbiAqIERlZmluZXMgdGhlIGZpZWxkcyBmb3IgYSBjb2x1bW4gY29uZmlndXJhdGlvbiBvYmplY3QgZGVmaW5lZCBpbiBhbiBpbmRleC4gU2VlIHtAbGluayBDQ0luZGV4fVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENDQ29sdW1uIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHR5cGVNb2RpZmllcj86IHN0cmluZztcbiAgICBlVHlwZTogRW5naW5lVHlwZTtcbiAgICBlVHlwZU1vZGlmaWVyOiBFbmdpbmVUeXBlTW9kaWZpZXI7XG4gICAgYWxpYXNlcz86IHN0cmluZ1tdO1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIGxhYmVsUGx1cmFsPzogc3RyaW5nO1xuICAgIGZvcm1hdHRlcj86IHN0cmluZztcbiAgICB0cmFuc2Zvcm1zPzogc3RyaW5nO1xuICAgIHBhcnNlcj86IHN0cmluZztcbn1cblxuLyoqXG4gKiBFbnVtIHJlcHJlc2VudGluZyBzdXBwb3J0ZWQgZXhwb3J0IHNvdXJjZS5cbiAqL1xuZXhwb3J0IGVudW0gRXhwb3J0U291cmNlVHlwZSB7XG4gICAgTm9uZSA9IDAsXG4gICAgUmVzdWx0ID0gMSxcbiAgICBTZWxlY3Rpb24gPSAyLFxuICAgIFNhdmVkUXVlcnkgPSA0XG59XG5cbi8qKlxuICogRW51bSByZXByZXNlbnRpbmcgc3VwcG9ydGVkIGV4cG9ydCBmb3JtYXQuXG4gKi9cbmV4cG9ydCBlbnVtIEV4cG9ydE91dHB1dEZvcm1hdCB7XG4gICAgTm9uZSA9IDAsXG4gICAgQ3N2ID0gMSxcbiAgICBYbHN4ID0gMixcbiAgICBKc29uID0gNFxufVxuXG4vKipcbiAqIERhdGEgbW9kZWwgb2YgdGhlIEV4cG9ydCBkaWFsb2cuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXhwb3J0RGlhbG9nTW9kZWwge1xuICAgIGZvcm1hdDogRXhwb3J0T3V0cHV0Rm9ybWF0O1xuICAgIGV4cG9ydDogRXhwb3J0U291cmNlVHlwZTtcbiAgICB3ZWJTZXJ2aWNlOiBzdHJpbmc7XG4gICAgbWF4Q291bnQ/OiBudW1iZXI7XG4gICAgcXVlcnlOYW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgZmllbGRzIGluIHRoZSBsYWJlbHMgd2ViIHNlcnZpY2UgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ0xhYmVscyBleHRlbmRzIENDV2ViU2VydmljZSB7XG4gICAgLyoqXG4gICAgICogVGhlIHRoZSBpbmRleCBjb2x1bW4gdG8gdXNlIGZvciBwdWJsaWMgbGFiZWxzXG4gICAgICovXG4gICAgcHVibGljTGFiZWxzRmllbGQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBIHNlbWktY29sb24gc2VwYXJhdGVkIGxpc3Qgb2YgcHJlZGVmaW5lZCBwdWJsaWMgbGFiZWxzXG4gICAgICovXG4gICAgZGVmYXVsdFB1YmxpY0xhYmVsczogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciBuZXcgcHVibGljIGxhYmVscyBjYW4gYmUgY3JlYXRlZCBieSB1c2Vyc1xuICAgICAqL1xuICAgIGFsbG93UHVibGljTGFiZWxzQ3JlYXRpb246IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQSBsaXN0IG9mIHByaW5jaXBhbCBpZHMgaWRlbnRpZnlpbmcgdXNlcnMgYW5kIGdyb3VwcyB0aGF0IGNhbiBjcmVhdGUgcHVibGljIGxhYmVsc1xuICAgICAqL1xuICAgIHB1YmxpY0xhYmVsc0NyZWF0aW9uUHJpbmNpcGFsSWRzOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIGV4aXN0aW5nIHB1YmxpYyBsYWJlbHMgY2FuIGJlIG1vZGlmaWVkIGJ5IHVzZXJzXG4gICAgICovXG4gICAgYWxsb3dQdWJsaWNMYWJlbHNNb2RpZmljYXRpb246IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQSBsaXN0IG9mIHByaW5jaXBhbCBpZHMgaWRlbnRpZnlpbmcgdXNlcnMgYW5kIGdyb3VwcyB0aGF0IGNhbiBtb2RpZnkgZXhpc3RpbmcgcHVibGljIGxhYmVsc1xuICAgICAqL1xuICAgIHB1YmxpY0xhYmVsc01vZGlmaWNhdGlvblByaW5jaXBhbElkczogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRoZSBpbmRleCBjb2x1bW4gdG8gdXNlIGZvciBwcml2YXRlIGxhYmVsc1xuICAgICAqL1xuICAgIHByaXZhdGVMYWJlbHNGaWVsZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGxhYmVscyB0byByZXR1cm4gd2hlbiBsaXN0aW5nIGxhYmVscyB1c2luZyB0aGUgW0xhYmVsc1dlYlNlcnZpY2UubGlzdF17QGxpbmsgTGFiZWxzV2ViU2VydmljZSNsaXN0fSBhcGlcbiAgICAgKi9cbiAgICBsYWJlbHNBdXRvU3VnZ2VzdE1heENvdW50OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgd2lsZGNhcmQgY2hhcmFjdGVyIHRvIHJlY29nbmlzZSB3aGVuIGxpc3RpbmcgbGFiZWxzIHVzaW5nIHRoZSBbTGFiZWxzV2ViU2VydmljZS5saXN0XXtAbGluayBMYWJlbHNXZWJTZXJ2aWNlI2xpc3R9IGFwaVxuICAgICAqL1xuICAgIGxhYmVsc0F1dG9TdWdnZXN0V2lsZGNhcmQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGZpZWxkcyBpbiB0aGUgYXV0b2NvbXBsZXRlIHdlYiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ0NBdXRvY29tcGxldGUgZXh0ZW5kcyBDQ1dlYlNlcnZpY2Uge1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGlzIGF1dG9jb21wbGV0ZSBzZXJ2aWNlIGlzIGVuYWJsZWRcbiAgICAgKi9cbiAgICBlbmFibGVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENvbnRhaW5zIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2Ygc3VnZ2VzdCBxdWVyaWVzIGZvciB0aGlzIHNlcnZpY2VcbiAgICAgKi9cbiAgICBzdWdnZXN0UXVlcmllczogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBtdXN0IGJlIGVudGVyZWQgYmVmb3JlIHByZXNlbnRpbmdcbiAgICAgKiBzdWdnZXN0aW9uc1xuICAgICAqL1xuICAgIGlucHV0TGVuZ3RoVHJpZ2dlcjogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciBzdWdnZXN0aW9ucyBzaG91bGQgYmUgZ3JvdXBlZCBpbnRvIGNhdGVnb3JpZXMgd2hlbiB0aGV5IGFyZSBkaXNwbGF5ZWRcbiAgICAgKi9cbiAgICBncm91cFN1Z2dlc3Rpb25zQnlDYXRlZ29yeTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgZmllbGRlZCBzZWFyY2ggc2hvdWxkIGJlIHVzZWQgd2hlbiBwcm9jZXNzaW5nIHN1Z2dlc3Rpb25zXG4gICAgICovXG4gICAgdXNlRmllbGRlZFNlYXJjaDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgaXRlbXMgcGVyIGNhdGVnb3J5IHRvIGRpc3BsYXkgd2hlbiBhIGNhdGVnb3J5IGlzIG5vdCBjb2xsYXBzZWRcbiAgICAgKi9cbiAgICB1bmNvbGxhcHNlZEl0ZW1zUGVyQ2F0ZWdvcnk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGZpZWxkcyBpbiB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDQ0FwcCBleHRlbmRzIENDQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIHRoZSB2ZXJzaW9uIG9mIHRoZSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uLiBUaGlzIGZpZWxkIGNhbiBiZSBwYXNzZWRcbiAgICAgKiB0byB0aGUgW0FwcFdlYlNlcnZpY2UucmVmcmVzaF17QGxpbmsgQXBwV2ViU2VydmljZSNyZWZyZXNofSBhcGkgdG8gdXBkYXRlIHRoZSBhcHBsaWNhdGlvblxuICAgICAqIGNvbmZpZ3VyYXRpb24gaWYgdGhlIHZlcnNpb24gbm93IGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyIGlzIGRpZmZlcmVudC5cbiAgICAgKi9cbiAgICB2ZXJzaW9uSWQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBxdWVyaWVzIGNvbmZpZ3VyZWQgb24gdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgcXVlcmllczogTWFwT2Y8Q0NRdWVyeT47XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgUkZNIG9iamVjdHMgY29uZmlndXJlZCBvbiB0aGUgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICByZm1zOiBNYXBPZjxDQ1JGTT47XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgaW5kZXhlcyBjb25maWd1cmVkIG9uIHRoZSBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIGluZGV4ZXM6IE1hcE9mPENDSW5kZXg+O1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGxpc3RzIGNvbmZpZ3VyZWQgb24gdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgbGlzdHM6IE1hcE9mPENDTGlzdD47XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgd2ViIHNlcnZpY2VzIGNvbmZpZ3VyZWQgb24gdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgd2ViU2VydmljZXM6IE1hcE9mPENDV2ViU2VydmljZT47XG4gICAgLyoqXG4gICAgICogQSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiB0aGUgbmFtZXMgb2YgdGhlIHF1ZXJpZXMgY29uZmlndXJlZCBvbiB0aGUgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICBxdWVyeU5hbWVzOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGxhYmVscyB3ZWIgc2VydmljZSBjb25maWd1cmVkIG9uIHRoZSBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIGxhYmVsczogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBwcmV2aWV3IHdlYiBzZXJ2aWNlIGNvbmZpZ3VyZWQgb24gdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgcHJldmlldzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBhdXRvY29tcGxldGUgd2ViIHNlcnZpY2UgY29uZmlndXJlZCBvbiB0aGUgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICBhdXRvY29tcGxldGU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgc3BvbnNvcmVkIGxpbmtzIHdlYiBzZXJ2aWNlIGNvbmZpZ3VyZWQgb24gdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgc3BvbnNvcmVkTGlua3M6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcXVlcnkgZXhwb3J0IHdlYiBzZXJ2aWNlIGNvbmZpZ3VyZWQgb24gdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgcXVlcnlFeHBvcnQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgUlNTIGZlZWRzIGFyZSBhdmFpbGFibGUgb24gc2F2ZWQgcXVlcmllc1xuICAgICAqL1xuICAgIHF1ZXJ5UnNzRW5hYmxlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDdXN0b20gSlNPTiBjb25maWd1cmF0aW9uIChzZWUgQXBwIEN1c3RvbWl6YXRpb24gdGFiIGluIFNpbmVxdWEgYWRtaW4pXG4gICAgICovXG4gICAgZGF0YTogSnNvbk9iamVjdDtcbiAgICAvKipcbiAgICAgKiBUaGUgdmVyc2lvbiBvZiB0aGUgc2VydmVyIEFQSS5cbiAgICAgKiBUaGlzIGZpZWxkIGlzIHVzZWQgdG8gY29tcGFyZSB3aXRoIFtNSU5JTVVNX0NPTVBBVElCTEVfU0VSVkVSX0FQSV9WRVJTSU9OXXtAbGluayBNSU5JTVVNX0NPTVBBVElCTEVfU0VSVkVSX0FQSV9WRVJTSU9OfVxuICAgICAqL1xuICAgIGFwaVZlcnNpb246IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgd29ya3NwYWNlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGFwcFxuICAgICAqL1xuICAgIHdvcmtzcGFjZUFwcDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBkZWZhdWx0IHF1ZXJ5XG4gICAgICovXG4gICAgZGVmYXVsdFF1ZXJ5TmFtZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSBtaW5pbXVtIHNlcnZlciBhcGkgdmVyc2lvbiB0aGF0IGNvbXBhdGlibGUgd2l0aCB0aGlzIHZlcnNpb24gb2YgU0JBLlxuICovXG5leHBvcnQgY29uc3QgTUlOSU1VTV9DT01QQVRJQkxFX1NFUlZFUl9BUElfVkVSU0lPTiA9ICcxLjAnO1xuIl19