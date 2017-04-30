import { Component, PropTypes } from 'react';

const UNLOAD_MESSAGE = 'Changes you made may not be saved. Are you sure you wish to exit?';

let instance = null;

export default class ReactEasyRouter extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    route: PropTypes.array.isRequired,
    unsaved: PropTypes.bool,
    unloadMessage: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = { watching: true };
    this.instantiate();
  }

  instantiate() {
    if (instance) {
      throw new Error('ReactSuperSimpleRouter Error: Multiple instances created. Only a single instance per application is allowed.');
    } else {
      instance = this;
    }
  }

  render() {
    return null;
  }

  componentWillMount() {
    this.changeRoute();
    window.addEventListener('hashchange', this.onHashChange.bind(this), false);
  }

  componentDidMount() {
    this.watchUnload(this.props.unsaved);
  }

  componentWillReceiveProps(nextProps) {
    this.watchUnload(nextProps.unsaved)
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange.bind(this), false);
    window.removeEventListener('beforeunload', this.onWindowUnload.bind(this), false);
  }

  watchUnload() {
    if (this.props.unsaved && !this.state.watching) {
      window.addEventListener('beforeunload', this.onWindowUnload.bind(this), false);
      this.setState({ watching: true });
    }
  }

  stopWatchUnload() {
    if (this.state.watching) {
      window.removeEventListener('beforeunload', this.onWindowUnload.bind(this), false);
      this.setState({ watching: false });
    }
  }

  onHashChange() {
    const { unsaved, route } = this.props;
    const currHash = `#${route.join('/')}`;
    const nextHash = window.location.hash;
    if (currHash !== nextHash && unsaved) {
      if (window.confirm(this.unloadMessage())) {
        this.changeRoute();
      } else {
        window.location = currHash;
      }
    } else {
      this.changeRoute();
    }
  }

  changeRoute() {
    const route = getRoute(window.location.hash);
    this.props.onChange(route);
  }

  onWindowUnload(event) {
    event.returnValue = this.unloadMessage();
    return this.unloadMessage();
  }

  unloadMessage() {
    return this.props.unloadMessage || UNLOAD_MESSAGE;
  }
}

function getRoute(hash) {
  return hash.replace(/^#/, '').replace(/^\/+|\/+$/g, '').split('/');
}
