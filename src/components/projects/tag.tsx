import get from 'lodash/get'

const getImageUrlFromName = (name: string) => {
  const tags = {
    xstate:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1617479794/blog/Image_2021-04-03_at_3.56.30_PM_q248jw.png',
    react:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1617479746/blog/Image_2021-04-03_at_3.54.11_PM_fortz9.png',
    ruby:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1617479738/blog/Image_2021-04-03_at_3.55.00_PM_zdw5ib.png',
    graphql:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1617479733/blog/Image_2021-04-03_at_3.55.23_PM_nditjp.png',
  }

  return get(tags, name) as string
}

function Tag({name}: {name: string}) {
  const imageURL = getImageUrlFromName(name)

  return <img src={imageURL} width={'auto'} height={'auto'} />
}

export default Tag
