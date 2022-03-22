

export const createHtmlVideo = (path, filename, ext) => {
    const video = document.createElement('video')

    const source = document.createElement('source')
    source.src = path + filename +"."+ ext
    source.type = "video/"+ ext
    video.append(source)
    video.autoplay = true
    video.loop = true
    video.style.visibility = 'hidden'

    document.body.append(video)

    return video
}

export const fireMobile = createHtmlVideo("/videoTextures/",'fire', 'ogg')
export const firePC = createHtmlVideo("/videoTextures/",'fire', 'webm')
