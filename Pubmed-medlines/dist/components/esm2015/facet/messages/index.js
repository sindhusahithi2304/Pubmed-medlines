import { Utils } from "@sinequa/core/base";
import { enSearch, frSearch, deSearch } from "@sinequa/components/search";
import { enSelection, frSelection, deSelection } from "@sinequa/components/selection";
import { enCollapse, frCollapse, deCollapse } from "@sinequa/components/collapse";
import _enFacet from "./en";
import _frFacet from "./fr";
import _deFacet from "./de";
const enFacet = Utils.merge({}, _enFacet, enSearch, enSelection, enCollapse);
const frFacet = Utils.merge({}, _frFacet, frSearch, frSelection, frCollapse);
const deFacet = Utils.merge({}, _deFacet, deSearch, deSelection, deCollapse);
export { enFacet, frFacet, deFacet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9mYWNldC8iLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLFFBQVEsTUFBTSxNQUFNLENBQUM7QUFDNUIsT0FBTyxRQUFRLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sUUFBUSxNQUFNLE1BQU0sQ0FBQztBQUU1QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3RSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3RSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUU3RSxPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7ZW5TZWFyY2gsIGZyU2VhcmNoLCBkZVNlYXJjaH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQge2VuU2VsZWN0aW9uLCBmclNlbGVjdGlvbiwgZGVTZWxlY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlbGVjdGlvblwiO1xuaW1wb3J0IHtlbkNvbGxhcHNlLCBmckNvbGxhcHNlLCBkZUNvbGxhcHNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9jb2xsYXBzZVwiO1xuaW1wb3J0IF9lbkZhY2V0IGZyb20gXCIuL2VuXCI7XG5pbXBvcnQgX2ZyRmFjZXQgZnJvbSBcIi4vZnJcIjtcbmltcG9ydCBfZGVGYWNldCBmcm9tIFwiLi9kZVwiO1xuXG5jb25zdCBlbkZhY2V0ID0gVXRpbHMubWVyZ2Uoe30sIF9lbkZhY2V0LCBlblNlYXJjaCwgZW5TZWxlY3Rpb24sIGVuQ29sbGFwc2UpO1xuY29uc3QgZnJGYWNldCA9IFV0aWxzLm1lcmdlKHt9LCBfZnJGYWNldCwgZnJTZWFyY2gsIGZyU2VsZWN0aW9uLCBmckNvbGxhcHNlKTtcbmNvbnN0IGRlRmFjZXQgPSBVdGlscy5tZXJnZSh7fSwgX2RlRmFjZXQsIGRlU2VhcmNoLCBkZVNlbGVjdGlvbiwgZGVDb2xsYXBzZSk7XG5cbmV4cG9ydCB7ZW5GYWNldCwgZnJGYWNldCwgZGVGYWNldH07XG5cbiJdfQ==