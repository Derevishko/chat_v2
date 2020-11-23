abstract class Validator<T> {
  protected abstract value: T;
  public abstract update(value: T): void;
  public abstract check(): boolean;
}

export default Validator;
