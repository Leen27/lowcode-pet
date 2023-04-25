// schemas/pet.js
export default {
    name: 'component',
    type: 'document',
    title: 'Component',
    fields: [
      {
        name: 'key',
        type: 'string',
        title: 'Key'
      },
      {
        name: 'thumbnail',
        type: 'image',
        title: 'Thumbnail'
      },
      {
        name: 'pkgUrl',
        type: 'string',
        title: 'PkgUrl'
      }
    ]
}