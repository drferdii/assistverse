export type Disease = {
  no: number
  category: string
  name: string
  ref: string
  summary: string
}

export type Category = {
  name: string
  count: number
  icon: string
}

export type Stat = {
  val: string
  label: string
}
