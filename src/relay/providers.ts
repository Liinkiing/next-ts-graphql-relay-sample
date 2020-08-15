import type { HandlerProvider } from 'relay-runtime/lib/handlers/RelayDefaultHandlerProvider'
import { ConnectionHandler, HandleFieldPayload } from 'relay-runtime'
import { RelayRecordSource } from 'relay-runtime/lib/store/RelayRecordSource'
import posters from '~/data/film/posters'

const PosterUrlHandler = {
  update(store: RelayRecordSource, payload: HandleFieldPayload) {
    const record = store.get(payload.dataID)
    switch (record.getType()) {
      case 'Film':
        record.setValue(posters[payload.dataID].url, payload.handleKey)
        break
    }
  },
}

const handlerProvider: HandlerProvider = handle => {
  switch (handle) {
    case 'connection':
      return ConnectionHandler
    case 'posterUrl':
      return PosterUrlHandler
    default:
      throw new Error(`Unknown handle ${handle}`)
  }
}

export default handlerProvider
