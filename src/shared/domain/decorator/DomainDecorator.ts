const DomainDecorator = (): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return <TFunction extends Function>(target: TFunction): TFunction => {
    return target
  }
}
export default DomainDecorator