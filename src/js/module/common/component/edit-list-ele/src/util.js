export const getValueByPath = function(object, prop) {
    prop = prop || '';
    const paths = prop.split('.');
    let current = object;
    let result = null;

    for (let i = 0, j = paths.length; i < j; i++) {
        const path = paths[i];

        if (!current) break;

        if (i === j - 1) {
            result = current[path];
            break;
        }
        current = current[path];
    }
    return result;
};

export const getCell = function(event) {
    let cell = event.target;

    while (cell && cell.tagName.toUpperCase() !== 'HTML') {
        if (cell.tagName.toUpperCase() === 'TD') {
            return cell;
        }
        cell = cell.parentNode;
    }

    return null;
};

const isObject = function(obj) {
    return obj !== null && typeof obj === 'object';
};

export const orderBy = function(array, sortKey, reverse, sortMethod, sortBy) {
    if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
        return array;
    }
    if (typeof reverse === 'string') {
        reverse = reverse === 'descending' ? -1 : 1;
    } else {
        reverse = reverse && reverse < 0 ? -1 : 1;
    }

    const getKey = sortMethod ? null : function(value, index) {
        if (sortBy) {
            if (!Array.isArray(sortBy)) {
                sortBy = [sortBy];
            }
            return sortBy.map(function(by) {
                if (typeof by === 'string') {
                    return getValueByPath(value, by);
                }
                return by(value, index, array);
            });
        }
        if (sortKey !== '$key') {
            if (isObject(value) && '$value' in value) value = value.$value;
        }
        return [isObject(value) ? getValueByPath(value, sortKey) : value];
    };
    const compare = function(a, b) {
        if (sortMethod) {
            return sortMethod(a.value, b.value);
        }
        for (let i = 0, len = a.key.length; i < len; i++) {
            if (a.key[i] < b.key[i]) {
                return -1;
            }
            if (a.key[i] > b.key[i]) {
                return 1;
            }
        }
        return 0;
    };

    return array.map(function(value, index) {
        return {
            value: value,
            index: index,
            key: getKey ? getKey(value, index) : null
        };
    }).sort(function(a, b) {
        let order = compare(a, b);

        if (!order) {
          // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
            order = a.index - b.index;
        }
        return order * reverse;
    }).map(item => item.value);
};

export const getColumnById = function(table, columnId) {
    let column = null;

    table.columns.forEach(function(item) {
        if (item.id === columnId) {
            column = item;
        }
    });
    return column;
};

export const getColumnByCell = function(table, cell) {
    const matches = (cell.className || '').match(/el-table_[^\s]+/gm);

    if (matches) {
        return getColumnById(table, matches[0]);
    }
    return null;
};

export const getRowIdentity = (row, rowKey) => {
    if (!row) throw new Error('row is required when get row identity');
    if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
            return row[rowKey];
        }
        const key = rowKey.split('.');
        let current = row;

        for (let i = 0; i < key.length; i++) {
            current = current[key[i]];
        }
        return current;
    } else if (typeof rowKey === 'function') {
        //return rowKey.call(null, row);
        return rowKey(row);
    }
    return '';
};

// 根据 column 组件上的 prop 属性的值(列表数据的key), 来获取 对应的 value
export const getPropByPath = function(obj, path, strict) {
    let tempObj = obj;

    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    const keyArr = path.split('.');
    let i = 0;

    for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break;
        const key = keyArr[i];

        if (key in tempObj) {
            tempObj = tempObj[key];
        } else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!');
            }
            break;
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null
    };
};
