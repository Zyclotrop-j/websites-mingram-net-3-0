import { compareLists } from "compare-lists";

function* diffOnPath(plan, actual, path = [], ops = undefined) { // ops? = { at: 0, parent?: <node> }
    const thisPath = plan?.component?.type || plan?.type || actual?.attributes?.type;
    if(!thisPath)console.warn(`Couldn't determine type`, {plan, actual, path, ops})

    if(plan && !actual) {
        const result = ops.parent.append(plan, ops);
        yield {message: `Add node ${path.join(" > ")} > ${thisPath}`, plan, actual: result, path: path.join(" > ")}
        return;
    }
    if(!plan && actual) {
        if(!actual.attributes.editable && actual.attributes.locked) {
            yield {message: `Keeping ad-hoc node ${path.join(" > ")} > ${thisPath}`, plan, actual, path: path.join(" > "), render: false};
            return;
        }
        actual.remove();
        yield {message: `Remove node ${path.join(" > ")} > ${thisPath}`, plan, actual, path: path.join(" > ")};
        return;
    }

    const acAttr = actual.getAttributes();
    const toBeAttr = plan.component?.attributes || plan.attributes || {};
    for(let key of new Set([
        ...Object.keys(acAttr),
        ...Object.keys(toBeAttr),
    ])) {
        if(key === 'class') continue;
        if(key === 'id') continue;
        if(acAttr[key] && !toBeAttr[key]) {yield {message: `Remove attr ${key}`, plan, actual, path: path.join(" > ")}; actual.removeAttributes(key); continue;}
        if(!acAttr[key] && toBeAttr[key]) {yield {message: `Add attr ${key} with ${toBeAttr[key]}`, plan, actual, path: path.join(" > ")}; actual.addAttributes({[key]: toBeAttr[key]}); continue;}
        if(acAttr[key] !== toBeAttr[key]) {yield {message: `Change attr ${key} from ${acAttr[key]} to ${toBeAttr[key]}`, plan, actual, path: path.join(" > ")}; actual.addAttributes({[key]: toBeAttr[key]}); continue;}// or setAttributes?
    }
    if(toBeAttr.id && !actual.getId()) { yield {message: `Set id to ${toBeAttr.id}`, plan, actual, path: path.join(" > ")}; actual.setId(toBeAttr.id); }
    else if(!toBeAttr.id && actual.getId()) { yield {message: `Remove id`, plan, actual, path: path.join(" > ")}; actual.setId(""); } // no removeMethod?
    else if(toBeAttr.id !== actual.getId()) { yield {message: `Set id from ${actual.getId()} to ${toBeAttr.id}`, plan, actual, path: path.join(" > ")}; actual.setId(toBeAttr.id); }

    const isClasses = actual.getClasses();
    const toBeClasses = (plan.component?.classes || plan.classes || []).map(i => i.name || i);
    for(let key of new Set([
        ...isClasses,
        ...toBeClasses,
    ])) {
        if(isClasses.includes(key) && !toBeClasses.includes(key)) {yield {message: `Remove class ${key}`, plan, actual, path: path.join(" > ")}; actual.removeClass(key); continue;}
        if(!isClasses.includes(key) && toBeClasses.includes(key)) {yield {message: `Add class ${key}`, plan, actual, path: path.join(" > ")}; actual.addClass(key); continue;}
    }

    const plantype = plan.component?.type || plan.type;
    if(actual.get("type") !== plantype && plantype) {
        yield {message: `Setting type from ${actual.get("type")} to ${plantype}`, plan, actual, path: path.join(" > ")};
        actual.set({type: plantype});
    }
    const planTagName = plan.component?.tagName || plan.tagName; 
    if(actual.get("tagName") !== planTagName && planTagName) {
        yield {message: `Setting tagName from ${actual.get("tagName")} to ${planTagName}`, plan, actual, path: path.join(" > ")};
        actual.set({tagName: planTagName});
    }
    const planContent = plan.component?.content || plan.content; 
    if(`${actual.get("content") || ''}` !== `${planContent || ''}`) {
        yield {message: `Setting content from ${actual.get("content")} to ${planContent}`, plan, actual, path: path.join(" > ")};
        actual.set({content: `${planContent || ''}`});
    } 

    const actualChildren = actual.components();
    const toBeChildren = plan.component?.components || plan.components || [];
    const addIndex = (obj, idx) => ({obj, idx});

    const oper = [];
    compareLists({
        left: actualChildren.map(addIndex),
        right: toBeChildren.map(addIndex),
        compare: ({obj: left}, {obj: right}) => {
            const leftId = left.getAttributes()?.c_id;
            const rightId = right.c_id || right.component.c_id;
            return leftId === rightId;
        },
        onMatch: ({obj: left, idx}, {obj: right}) => oper.push(() => diffOnPath(right, left, [...path, thisPath, idx], { at: idx, parent: actual })),
        onMissingInLeft: ({obj: right, idx}) => oper.unshift(() => diffOnPath(right, null, [...path, thisPath, idx], { at: idx, parent: actual })),
        onMissingInRight: ({obj: left, idx}) => oper.push(() => diffOnPath(null, left, [...path, thisPath, idx], { at: idx, parent: actual })),
    });

    for (const op of oper) {
        yield* op();
    }
}
  
export default (first, second) => {
    console.group("diff and patch");
    const result = [...diffOnPath(first, second)];
    console.groupEnd();
    return result;
};