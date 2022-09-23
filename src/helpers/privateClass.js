const modifyPluginArg = plugin => (editor, ...args) => {
    
    const fn = arg => Array.isArray(arg.model.defaults?.attributes?.class) ? arg.model.defaults?.attributes?.class : (arg.model.defaults?.attributes?.class?.split(' ') ?? []);
    const fn2 = arg => arg.model.defaults?.traits?.filter(trait => 
        trait?.type === 'class_select' || trait.privateClass === true,
    ).flatMap(trait => 
        trait.options.flatMap(opt => opt.value.split(' '))
    ).filter(i => i?.trim?.()) ?? [];
    const addType = (name, obj) => {
        const classes = [...fn2(obj), ...fn(obj)].filter((i, idx, arr) => i && arr.indexOf(i) === idx);
        const c = editor.Components.addType(name, obj);
        classes.forEach(className => {
            const getSelector = () => editor.Selectors.getAll().findWhere({
                type: 1,
                name: className,
            });
            const existingSelector = getSelector();
            if(existingSelector) {
                existingSelector.set({ private: true });
            } else {
                const selectorFn =  (selector) => { 
                    if(selector.isClass() && selector.get('name') === className) {
                        selector.set({ private: true });
                        editor.off('selector:add', selectorFn);
                    }
                };
                editor.on('selector:add', selectorFn);
            }
        });
        
        return c;
    };
    const prox = new Proxy(editor, {
        get(target, prop, receiver) {
            if(prop === 'Components') {
                return new Proxy(editor.Components, {
                    get(target, prop, receiver) {
                        if(prop === 'addType') {
                            return addType;
                        }
                        return Reflect.get(target, prop, receiver);
                    },
                    set(target, prop, value) {
                        return Reflect.set(target, prop, value);
                    }
                })
            }
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value) {
            return Reflect.set(target, prop, value);
        }
    });
    return plugin(prox, ...args);
};

export default plugins => {
    return plugins.map(
        plugin => typeof plugin === 'string' ? plugin : modifyPluginArg(plugin)
    );
};