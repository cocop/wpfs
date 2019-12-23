/*!
 * wpfs
 * Apache Licence 2.0
 * https://github.com/cocop/wpfs/blob/master/LICENSE
 */

import fs from 'fs'
import path from 'path'

const getIndexFilePath = (dirPath: string, indexName?: string) => {
  const indexRegExp = new RegExp('^' + (indexName || 'index') + '*')

  const indexFileName = fs.readdirSync(dirPath).find((itemName) => {
    const indexMatched = itemName.match(indexRegExp)
    return (indexMatched?.length ?? 0) === 1
  })

  return indexFileName ? path.join(dirPath, indexFileName) : undefined
}

export default (srcDirPath: string, indexName?: string) => {
  const srcFolderNames = fs.readdirSync(srcDirPath).filter((itemName) => {
    const itemPath = path.join(srcDirPath, itemName)
    return fs.statSync(itemPath).isDirectory()
  })

  const srcIndexFilePaths = srcFolderNames.map((folderName) => {
    const srcFolderPath = path.join(srcDirPath, folderName)
    return getIndexFilePath(srcFolderPath, indexName)
  })

  const result: { [k: string]: string } = {}

  srcFolderNames.forEach((v, i) => {
    const srcIndexFilePath = srcIndexFilePaths[i]

    if (srcIndexFilePath !== undefined) {
      result[v] = srcIndexFilePath
    }
  })

  return result
}
