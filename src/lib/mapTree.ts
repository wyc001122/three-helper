export function mapTree<T>(
    data?: T[],
    callback?: (item: T) => T,
    childrenField = 'children',
) {
    if (data) {
        return data.map((d: any) => {
            if (d[childrenField]?.length) {
                d[childrenField] = mapTree(d[childrenField], callback, childrenField)
            }
            return callback
                ? callback(d)
                : d
        })
    }
}