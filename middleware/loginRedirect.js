export default function (context) {
  // if user exist and not equal to null redirect to home
  if (context.store.getters.user !== null) {
    return context.redirect('/')
  }
}
