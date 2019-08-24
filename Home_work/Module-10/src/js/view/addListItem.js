import createListItem from "./createListitem";

function addListItem(ref, note) {
  ref.append(createListItem(note));
}

export default addListItem;
