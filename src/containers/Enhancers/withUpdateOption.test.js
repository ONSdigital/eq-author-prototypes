import { mapMutateToProps } from "./withUpdateOption";

describe("Enhancers > withUpdateOption", () => {
  describe("mapMutateToProps", () => {
    let props;
    let mutate;
    let option;

    beforeEach(() => {
      mutate = jest.fn();
      props = mapMutateToProps({ mutate });
      option = jest.fn();
    });

    it("should have an onUpdateOption prop", () => {
      expect(props.onUpdateOption).toBeInstanceOf(Function);
    });

    it("should call mutate", () => {
      props.onUpdateOption(option);

      expect(mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: option
        })
      );
    });
  });
});
