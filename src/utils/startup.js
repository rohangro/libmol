/**
 * define default settings at starting up
 */

let defaultParameters = {
  file: 'static/mol/1BKV-collagene.mmtf.gz',
  value: 'Collagene',
  source: 'libmol',
  molId: '63',
  embedded: false
}
/**
 * transform the search part of the URL in a JSON
 *
 * @returns object
 */
function getSearchParameters () {
  const search = document.location.search.substr(1)
  let params = {}

  const tabParams = search.split('&')
  tabParams.forEach(val => {
    let tabProp = val.split('=')
    Object.defineProperty(
      params,
      tabProp[0],
      {
        value: tabProp[1] || true,
        enumerable: true
      })
  })

  if (params.hasOwnProperty('pdb')) {
    if (params.pdb.length === 4) {
      params.file = `rcsb://${params.pdb}`
      params.value = ''
      params.source = 'pdb'
      params.molId = params.pdb
    } else if (params.pdb.length < 4 && params.pdb.length > 0) {
      params.file = `https://files.rcsb.org/ligands/view/${params.pdb}.cif`
      params.value = ''
      params.source = 'pdb ligand'
      params.molId = params.pdb
    }
  }

  if (params.hasOwnProperty('pubchem')) {
    params.file = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${params.pubchem}/record/SDF/?record_type=3d&response_type=save&response_basename=Structure3D_CID_${params.pubchem}`
    params.value = ''
    params.ext = 'mol'
  }
  // console.dir(params)
  return params
}

function getStartingParameters () {
  return Object.assign(defaultParameters, getSearchParameters())
}

export default getStartingParameters
