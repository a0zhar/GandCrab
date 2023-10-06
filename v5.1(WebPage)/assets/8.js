(window.webpackJsonp = window.webpackJsonp || []).push([
    [8],
    {
      707: function (t, e, n) {
        "use strict";
        n.r(e);
        var o = n(0),
          i = n.n(o),
          r = n(711),
          s = n(14);
        n(5);
        function c(t) {
          return (c =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function a(t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o);
          }
        }
        function l(t) {
          return (l = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
        }
        function u(t, e) {
          return (u =
            Object.setPrototypeOf ||
            function (t, e) {
              return (t.__proto__ = e), t;
            })(t, e);
        }
        function p(t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        }
        var h = (function (t) {
          function e(t) {
            var n, o, i;
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
              (o = this),
              ((n =
                !(i = l(e).call(this, t)) ||
                ("object" !== c(i) && "function" != typeof i)
                  ? p(o)
                  : i).state = { installStatus: !0 }),
              (n.onReceived = n.onReceived.bind(p(p(n)))),
              (n.handleConnected = n.handleConnected.bind(p(p(n)))),
              (n.handleDisconnected = n.handleDisconnected.bind(p(p(n)))),
              n
            );
          }
          var n, o, h;
          return (
            (function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 }
              })),
                e && u(t, e);
            })(e, i.a.PureComponent),
            (n = e),
            (o = [
              {
                key: "onReceived",
                value: function (t) {
                  return (
                    console.log("WS: ", t),
                    "newTransaction" === t.type
                      ? (0, this.props.onTransactionReceive)(t.data)
                      : "newTransactionConfirmation" === t.type
                      ? (0, this.props.onTransactionConfirmationReceive)(t.data)
                      : "transactionConfirmed" === t.type
                      ? (0, this.props.onTransactionConfirmed)(t.data)
                      : "chatMessage" === t.type
                      ? (0, this.props.onChatMessageReceive)(t)
                      : "botReload" === t.type
                      ? (0, this.props.fetchBot)()
                      : "cleanChat" === t.type
                      ? (0, this.props.cleanChat)()
                      : void 0
                  );
                }
              },
              {
                key: "handleConnected",
                value: function () {
                  var t = this;
                  if (!this.state.installStatus) {
                    var e = this.props.onConnected;
                    return Promise.resolve(e()).then(function () {
                      return t.setState({ installStatus: !0 });
                    });
                  }
                  console.log("[AC] connected");
                }
              },
              {
                key: "handleDisconnected",
                value: function () {
                  this.setState({ installStatus: !1 }),
                    console.log("[AC] disconnected");
                }
              },
              {
                key: "render",
                value: function () {
                  var t = this.props.botId;
                  return i.a.createElement(
                    r.ActionCableProvider,
                    { url: "".concat(s.e, "?id=").concat(t) },
                    i.a.createElement(r.ActionCable, {
                      channel: { channel: "CrabChannel", id: t },
                      onReceived: this.onReceived,
                      onConnected: this.handleConnected,
                      onDisconnected: this.handleDisconnected,
                      onInitialized: function () {
                        return console.log("[AC] init");
                      },
                      onRejected: function () {
                        return console.log("[AC] rejected");
                      }
                    }),
                    this.props.children
                  );
                }
              }
            ]) && a(n.prototype, o),
            h && a(n, h),
            e
          );
        })();
        e.default = h;
      },
      711: function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        n(0);
        var o = n(5),
          i = n(712),
          r = n(713),
          s = r({
            getChildContext: function () {
              return { cable: this.cable };
            },
            componentWillMount: function () {
              this.props.cable
                ? (this.cable = this.props.cable)
                : (this.cable = i.createConsumer(this.props.url));
            },
            componentWillUnmount: function () {
              !this.props.cable && this.cable && this.cable.disconnect();
            },
            componentWillReceiveProps: function (t) {
              (this.props.cable === t.cable && this.props.url === t.url) ||
                (this.componentWillUnmount(), this.componentWillMount());
            },
            render: function () {
              return this.props.children || null;
            }
          });
        (s.displayName = "ActionCableProvider"),
          (s.propTypes = { cable: o.object, url: o.string, children: o.any }),
          (s.childContextTypes = { cable: o.object.isRequired });
        var c = r({
          componentDidMount: function () {
            var t = this.props,
              e = t.onReceived,
              n = t.onInitialized,
              o = t.onConnected,
              i = t.onDisconnected,
              r = t.onRejected;
            this.cable = this.context.cable.subscriptions.create(
              this.props.channel,
              {
                received: function (t) {
                  e && e(t);
                },
                initialized: function () {
                  n && n();
                },
                connected: function () {
                  o && o();
                },
                disconnected: function () {
                  i && i();
                },
                rejected: function () {
                  r && r();
                }
              }
            );
          },
          componentWillUnmount: function () {
            this.cable &&
              (this.context.cable.subscriptions.remove(this.cable),
              (this.cable = null));
          },
          send: function (t) {
            if (!this.cable) throw new Error("ActionCable component unloaded");
            this.cable.send(t);
          },
          perform: function (t, e) {
            if (!this.cable) throw new Error("ActionCable component unloaded");
            this.cable.perform(t, e);
          },
          render: function () {
            return this.props.children || null;
          }
        });
        (c.displayName = "ActionCable"),
          (c.propTypes = {
            onReceived: o.func,
            onInitialized: o.func,
            onConnected: o.func,
            onDisconnected: o.func,
            onRejected: o.func,
            children: o.any
          }),
          (c.contextTypes = { cable: o.object.isRequired }),
          (e.ActionCable = c),
          (e.ActionCableProvider = s),
          (e.default = s);
      },
      712: function (t, e, n) {
        var o, i;
        (function () {
          (function () {
            (function () {
              var t = [].slice;
              this.ActionCable = {
                INTERNAL: {
                  message_types: {
                    welcome: "welcome",
                    ping: "ping",
                    confirmation: "confirm_subscription",
                    rejection: "reject_subscription"
                  },
                  default_mount_path: "/cable",
                  protocols: ["actioncable-v1-json", "actioncable-unsupported"]
                },
                WebSocket: window.WebSocket,
                logger: window.console,
                createConsumer: function (t) {
                  var e;
                  return (
                    null == t &&
                      (t =
                        null != (e = this.getConfig("url"))
                          ? e
                          : this.INTERNAL.default_mount_path),
                    new r.Consumer(this.createWebSocketURL(t))
                  );
                },
                getConfig: function (t) {
                  var e;
                  return null !=
                    (e = document.head.querySelector(
                      "meta[name='action-cable-" + t + "']"
                    ))
                    ? e.getAttribute("content")
                    : void 0;
                },
                createWebSocketURL: function (t) {
                  var e;
                  return t && !/^wss?:/i.test(t)
                    ? (((e = document.createElement("a")).href = t),
                      (e.href = e.href),
                      (e.protocol = e.protocol.replace("http", "ws")),
                      e.href)
                    : t;
                },
                startDebugging: function () {
                  return (this.debugging = !0);
                },
                stopDebugging: function () {
                  return (this.debugging = null);
                },
                log: function () {
                  var e, n;
                  if (
                    ((e = 1 <= arguments.length ? t.call(arguments, 0) : []),
                    this.debugging)
                  )
                    return (
                      e.push(Date.now()),
                      (n = this.logger).log.apply(
                        n,
                        ["[ActionCable]"].concat(t.call(e))
                      )
                    );
                }
              };
            }.call(this));
          }.call(this));
          var r = this.ActionCable;
          (function () {
            (function () {
              var t = function (t, e) {
                return function () {
                  return t.apply(e, arguments);
                };
              };
              r.ConnectionMonitor = (function () {
                var e, n, o;
                function i(e) {
                  (this.connection = e),
                    (this.visibilityDidChange = t(
                      this.visibilityDidChange,
                      this
                    )),
                    (this.reconnectAttempts = 0);
                }
                return (
                  (i.pollInterval = { min: 3, max: 30 }),
                  (i.staleThreshold = 6),
                  (i.prototype.start = function () {
                    if (!this.isRunning())
                      return (
                        (this.startedAt = n()),
                        delete this.stoppedAt,
                        this.startPolling(),
                        document.addEventListener(
                          "visibilitychange",
                          this.visibilityDidChange
                        ),
                        r.log(
                          "ConnectionMonitor started. pollInterval = " +
                            this.getPollInterval() +
                            " ms"
                        )
                      );
                  }),
                  (i.prototype.stop = function () {
                    if (this.isRunning())
                      return (
                        (this.stoppedAt = n()),
                        this.stopPolling(),
                        document.removeEventListener(
                          "visibilitychange",
                          this.visibilityDidChange
                        ),
                        r.log("ConnectionMonitor stopped")
                      );
                  }),
                  (i.prototype.isRunning = function () {
                    return null != this.startedAt && null == this.stoppedAt;
                  }),
                  (i.prototype.recordPing = function () {
                    return (this.pingedAt = n());
                  }),
                  (i.prototype.recordConnect = function () {
                    return (
                      (this.reconnectAttempts = 0),
                      this.recordPing(),
                      delete this.disconnectedAt,
                      r.log("ConnectionMonitor recorded connect")
                    );
                  }),
                  (i.prototype.recordDisconnect = function () {
                    return (
                      (this.disconnectedAt = n()),
                      r.log("ConnectionMonitor recorded disconnect")
                    );
                  }),
                  (i.prototype.startPolling = function () {
                    return this.stopPolling(), this.poll();
                  }),
                  (i.prototype.stopPolling = function () {
                    return clearTimeout(this.pollTimeout);
                  }),
                  (i.prototype.poll = function () {
                    return (this.pollTimeout = setTimeout(
                      ((t = this),
                      function () {
                        return t.reconnectIfStale(), t.poll();
                      }),
                      this.getPollInterval()
                    ));
                    var t;
                  }),
                  (i.prototype.getPollInterval = function () {
                    var t, n, o, i;
                    return (
                      (o = (i = this.constructor.pollInterval).min),
                      (n = i.max),
                      (t = 5 * Math.log(this.reconnectAttempts + 1)),
                      Math.round(1e3 * e(t, o, n))
                    );
                  }),
                  (i.prototype.reconnectIfStale = function () {
                    if (this.connectionIsStale())
                      return (
                        r.log(
                          "ConnectionMonitor detected stale connection. reconnectAttempts = " +
                            this.reconnectAttempts +
                            ", pollInterval = " +
                            this.getPollInterval() +
                            " ms, time disconnected = " +
                            o(this.disconnectedAt) +
                            " s, stale threshold = " +
                            this.constructor.staleThreshold +
                            " s"
                        ),
                        this.reconnectAttempts++,
                        this.disconnectedRecently()
                          ? r.log(
                              "ConnectionMonitor skipping reopening recent disconnect"
                            )
                          : (r.log("ConnectionMonitor reopening"),
                            this.connection.reopen())
                      );
                  }),
                  (i.prototype.connectionIsStale = function () {
                    var t;
                    return (
                      o(null != (t = this.pingedAt) ? t : this.startedAt) >
                      this.constructor.staleThreshold
                    );
                  }),
                  (i.prototype.disconnectedRecently = function () {
                    return (
                      this.disconnectedAt &&
                      o(this.disconnectedAt) < this.constructor.staleThreshold
                    );
                  }),
                  (i.prototype.visibilityDidChange = function () {
                    if ("visible" === document.visibilityState)
                      return setTimeout(
                        ((t = this),
                        function () {
                          if (t.connectionIsStale() || !t.connection.isOpen())
                            return (
                              r.log(
                                "ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " +
                                  document.visibilityState
                              ),
                              t.connection.reopen()
                            );
                        }),
                        200
                      );
                    var t;
                  }),
                  (n = function () {
                    return new Date().getTime();
                  }),
                  (o = function (t) {
                    return (n() - t) / 1e3;
                  }),
                  (e = function (t, e, n) {
                    return Math.max(e, Math.min(n, t));
                  }),
                  i
                );
              })();
            }.call(this),
              function () {
                var t,
                  e,
                  n,
                  o,
                  i,
                  s = [].slice,
                  c = function (t, e) {
                    return function () {
                      return t.apply(e, arguments);
                    };
                  },
                  a =
                    [].indexOf ||
                    function (t) {
                      for (var e = 0, n = this.length; e < n; e++)
                        if (e in this && this[e] === t) return e;
                      return -1;
                    };
                (o = r.INTERNAL),
                  (e = o.message_types),
                  (n = o.protocols),
                  (i =
                    2 <= n.length
                      ? s.call(n, 0, (t = n.length - 1))
                      : ((t = 0), [])),
                  n[t++],
                  (r.Connection = (function () {
                    function t(t) {
                      (this.consumer = t),
                        (this.open = c(this.open, this)),
                        (this.subscriptions = this.consumer.subscriptions),
                        (this.monitor = new r.ConnectionMonitor(this)),
                        (this.disconnected = !0);
                    }
                    return (
                      (t.reopenDelay = 500),
                      (t.prototype.send = function (t) {
                        return (
                          !!this.isOpen() &&
                          (this.webSocket.send(JSON.stringify(t)), !0)
                        );
                      }),
                      (t.prototype.open = function () {
                        return this.isActive()
                          ? (r.log(
                              "Attempted to open WebSocket, but existing socket is " +
                                this.getState()
                            ),
                            !1)
                          : (r.log(
                              "Opening WebSocket, current state is " +
                                this.getState() +
                                ", subprotocols: " +
                                n
                            ),
                            null != this.webSocket &&
                              this.uninstallEventHandlers(),
                            (this.webSocket = new r.WebSocket(
                              this.consumer.url,
                              n
                            )),
                            this.installEventHandlers(),
                            this.monitor.start(),
                            !0);
                      }),
                      (t.prototype.close = function (t) {
                        var e;
                        if (
                          ((null != t ? t : { allowReconnect: !0 })
                            .allowReconnect || this.monitor.stop(),
                          this.isActive())
                        )
                          return null != (e = this.webSocket)
                            ? e.close()
                            : void 0;
                      }),
                      (t.prototype.reopen = function () {
                        var t;
                        if (
                          (r.log(
                            "Reopening WebSocket, current state is " +
                              this.getState()
                          ),
                          !this.isActive())
                        )
                          return this.open();
                        try {
                          return this.close();
                        } catch (e) {
                          return (t = e), r.log("Failed to reopen WebSocket", t);
                        } finally {
                          r.log(
                            "Reopening WebSocket in " +
                              this.constructor.reopenDelay +
                              "ms"
                          ),
                            setTimeout(this.open, this.constructor.reopenDelay);
                        }
                      }),
                      (t.prototype.getProtocol = function () {
                        var t;
                        return null != (t = this.webSocket) ? t.protocol : void 0;
                      }),
                      (t.prototype.isOpen = function () {
                        return this.isState("open");
                      }),
                      (t.prototype.isActive = function () {
                        return this.isState("open", "connecting");
                      }),
                      (t.prototype.isProtocolSupported = function () {
                        var t;
                        return (t = this.getProtocol()), a.call(i, t) >= 0;
                      }),
                      (t.prototype.isState = function () {
                        var t, e;
                        return (
                          (e = 1 <= arguments.length ? s.call(arguments, 0) : []),
                          (t = this.getState()),
                          a.call(e, t) >= 0
                        );
                      }),
                      (t.prototype.getState = function () {
                        var t, e;
                        for (e in WebSocket)
                          if (
                            WebSocket[e] ===
                            (null != (t = this.webSocket) ? t.readyState : void 0)
                          )
                            return e.toLowerCase();
                        return null;
                      }),
                      (t.prototype.installEventHandlers = function () {
                        var t, e;
                        for (t in this.events)
                          (e = this.events[t].bind(this)),
                            (this.webSocket["on" + t] = e);
                      }),
                      (t.prototype.uninstallEventHandlers = function () {
                        var t;
                        for (t in this.events)
                          this.webSocket["on" + t] = function () {};
                      }),
                      (t.prototype.events = {
                        message: function (t) {
                          var n, o, i;
                          if (this.isProtocolSupported())
                            switch (
                              ((n = (i = JSON.parse(t.data)).identifier),
                              (o = i.message),
                              i.type)
                            ) {
                              case e.welcome:
                                return (
                                  this.monitor.recordConnect(),
                                  this.subscriptions.reload()
                                );
                              case e.ping:
                                return this.monitor.recordPing();
                              case e.confirmation:
                                return this.subscriptions.notify(n, "connected");
                              case e.rejection:
                                return this.subscriptions.reject(n);
                              default:
                                return this.subscriptions.notify(
                                  n,
                                  "received",
                                  o
                                );
                            }
                        },
                        open: function () {
                          if (
                            (r.log(
                              "WebSocket onopen event, using '" +
                                this.getProtocol() +
                                "' subprotocol"
                            ),
                            (this.disconnected = !1),
                            !this.isProtocolSupported())
                          )
                            return (
                              r.log(
                                "Protocol is unsupported. Stopping monitor and disconnecting."
                              ),
                              this.close({ allowReconnect: !1 })
                            );
                        },
                        close: function (t) {
                          if (
                            (r.log("WebSocket onclose event"), !this.disconnected)
                          )
                            return (
                              (this.disconnected = !0),
                              this.monitor.recordDisconnect(),
                              this.subscriptions.notifyAll("disconnected", {
                                willAttemptReconnect: this.monitor.isRunning()
                              })
                            );
                        },
                        error: function () {
                          return r.log("WebSocket onerror event");
                        }
                      }),
                      t
                    );
                  })());
              }.call(this),
              function () {
                var t = [].slice;
                r.Subscriptions = (function () {
                  function e(t) {
                    (this.consumer = t), (this.subscriptions = []);
                  }
                  return (
                    (e.prototype.create = function (t, e) {
                      var n, o, i;
                      return (
                        (o = "object" == typeof (n = t) ? n : { channel: n }),
                        (i = new r.Subscription(this.consumer, o, e)),
                        this.add(i)
                      );
                    }),
                    (e.prototype.add = function (t) {
                      return (
                        this.subscriptions.push(t),
                        this.consumer.ensureActiveConnection(),
                        this.notify(t, "initialized"),
                        this.sendCommand(t, "subscribe"),
                        t
                      );
                    }),
                    (e.prototype.remove = function (t) {
                      return (
                        this.forget(t),
                        this.findAll(t.identifier).length ||
                          this.sendCommand(t, "unsubscribe"),
                        t
                      );
                    }),
                    (e.prototype.reject = function (t) {
                      var e, n, o, i, r;
                      for (
                        i = [], e = 0, n = (o = this.findAll(t)).length;
                        e < n;
                        e++
                      )
                        (r = o[e]),
                          this.forget(r),
                          this.notify(r, "rejected"),
                          i.push(r);
                      return i;
                    }),
                    (e.prototype.forget = function (t) {
                      var e;
                      return (
                        (this.subscriptions = function () {
                          var n, o, i, r;
                          for (
                            r = [], n = 0, o = (i = this.subscriptions).length;
                            n < o;
                            n++
                          )
                            (e = i[n]) !== t && r.push(e);
                          return r;
                        }.call(this)),
                        t
                      );
                    }),
                    (e.prototype.findAll = function (t) {
                      var e, n, o, i, r;
                      for (
                        i = [], e = 0, n = (o = this.subscriptions).length;
                        e < n;
                        e++
                      )
                        (r = o[e]).identifier === t && i.push(r);
                      return i;
                    }),
                    (e.prototype.reload = function () {
                      var t, e, n, o, i;
                      for (
                        o = [], t = 0, e = (n = this.subscriptions).length;
                        t < e;
                        t++
                      )
                        (i = n[t]), o.push(this.sendCommand(i, "subscribe"));
                      return o;
                    }),
                    (e.prototype.notifyAll = function () {
                      var e, n, o, i, r, s, c;
                      for (
                        n = arguments[0],
                          e = 2 <= arguments.length ? t.call(arguments, 1) : [],
                          s = [],
                          o = 0,
                          i = (r = this.subscriptions).length;
                        o < i;
                        o++
                      )
                        (c = r[o]),
                          s.push(
                            this.notify.apply(this, [c, n].concat(t.call(e)))
                          );
                      return s;
                    }),
                    (e.prototype.notify = function () {
                      var e, n, o, i, r, s, c;
                      for (
                        s = arguments[0],
                          n = arguments[1],
                          e = 3 <= arguments.length ? t.call(arguments, 2) : [],
                          r = [],
                          o = 0,
                          i = (c = "string" == typeof s ? this.findAll(s) : [s])
                            .length;
                        o < i;
                        o++
                      )
                        (s = c[o]),
                          r.push(
                            "function" == typeof s[n] ? s[n].apply(s, e) : void 0
                          );
                      return r;
                    }),
                    (e.prototype.sendCommand = function (t, e) {
                      var n;
                      return (
                        (n = t.identifier),
                        this.consumer.send({ command: e, identifier: n })
                      );
                    }),
                    e
                  );
                })();
              }.call(this),
              function () {
                r.Subscription = (function () {
                  var t;
                  function e(e, n, o) {
                    (this.consumer = e),
                      null == n && (n = {}),
                      (this.identifier = JSON.stringify(n)),
                      t(this, o);
                  }
                  return (
                    (e.prototype.perform = function (t, e) {
                      return null == e && (e = {}), (e.action = t), this.send(e);
                    }),
                    (e.prototype.send = function (t) {
                      return this.consumer.send({
                        command: "message",
                        identifier: this.identifier,
                        data: JSON.stringify(t)
                      });
                    }),
                    (e.prototype.unsubscribe = function () {
                      return this.consumer.subscriptions.remove(this);
                    }),
                    (t = function (t, e) {
                      var n, o;
                      if (null != e) for (n in e) (o = e[n]), (t[n] = o);
                      return t;
                    }),
                    e
                  );
                })();
              }.call(this),
              function () {
                r.Consumer = (function () {
                  function t(t) {
                    (this.url = t),
                      (this.subscriptions = new r.Subscriptions(this)),
                      (this.connection = new r.Connection(this));
                  }
                  return (
                    (t.prototype.send = function (t) {
                      return this.connection.send(t);
                    }),
                    (t.prototype.connect = function () {
                      return this.connection.open();
                    }),
                    (t.prototype.disconnect = function () {
                      return this.connection.close({ allowReconnect: !1 });
                    }),
                    (t.prototype.ensureActiveConnection = function () {
                      if (!this.connection.isActive())
                        return this.connection.open();
                    }),
                    t
                  );
                })();
              }.call(this));
          }.call(this),
            "object" == typeof t && t.exports
              ? (t.exports = r)
              : void 0 ===
                  (i = "function" == typeof (o = r) ? o.call(e, n, e, t) : o) ||
                (t.exports = i));
        }.call(this));
      },
      713: function (t, e, n) {
        "use strict";
        var o = n(0),
          i = n(714);
        if (void 0 === o)
          throw Error(
            "create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class."
          );
        var r = new o.Component().updater;
        t.exports = i(o.Component, o.isValidElement, r);
      },
      714: function (t, e, n) {
        "use strict";
        var o = n(161),
          i = n(163),
          r = n(162),
          s = "mixins";
        t.exports = function (t, e, n) {
          var c = [],
            a = {
              mixins: "DEFINE_MANY",
              statics: "DEFINE_MANY",
              propTypes: "DEFINE_MANY",
              contextTypes: "DEFINE_MANY",
              childContextTypes: "DEFINE_MANY",
              getDefaultProps: "DEFINE_MANY_MERGED",
              getInitialState: "DEFINE_MANY_MERGED",
              getChildContext: "DEFINE_MANY_MERGED",
              render: "DEFINE_ONCE",
              componentWillMount: "DEFINE_MANY",
              componentDidMount: "DEFINE_MANY",
              componentWillReceiveProps: "DEFINE_MANY",
              shouldComponentUpdate: "DEFINE_ONCE",
              componentWillUpdate: "DEFINE_MANY",
              componentDidUpdate: "DEFINE_MANY",
              componentWillUnmount: "DEFINE_MANY",
              UNSAFE_componentWillMount: "DEFINE_MANY",
              UNSAFE_componentWillReceiveProps: "DEFINE_MANY",
              UNSAFE_componentWillUpdate: "DEFINE_MANY",
              updateComponent: "OVERRIDE_BASE"
            },
            l = { getDerivedStateFromProps: "DEFINE_MANY_MERGED" },
            u = {
              displayName: function (t, e) {
                t.displayName = e;
              },
              mixins: function (t, e) {
                if (e) for (var n = 0; n < e.length; n++) h(t, e[n]);
              },
              childContextTypes: function (t, e) {
                t.childContextTypes = o({}, t.childContextTypes, e);
              },
              contextTypes: function (t, e) {
                t.contextTypes = o({}, t.contextTypes, e);
              },
              getDefaultProps: function (t, e) {
                t.getDefaultProps
                  ? (t.getDefaultProps = d(t.getDefaultProps, e))
                  : (t.getDefaultProps = e);
              },
              propTypes: function (t, e) {
                t.propTypes = o({}, t.propTypes, e);
              },
              statics: function (t, e) {
                !(function (t, e) {
                  if (e)
                    for (var n in e) {
                      var o = e[n];
                      if (e.hasOwnProperty(n)) {
                        var i = n in u;
                        r(
                          !i,
                          'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',
                          n
                        );
                        var s = n in t;
                        if (s) {
                          var c = l.hasOwnProperty(n) ? l[n] : null;
                          return (
                            r(
                              "DEFINE_MANY_MERGED" === c,
                              "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",
                              n
                            ),
                            void (t[n] = d(t[n], o))
                          );
                        }
                        t[n] = o;
                      }
                    }
                })(t, e);
              },
              autobind: function () {}
            };
          function p(t, e) {
            var n = a.hasOwnProperty(e) ? a[e] : null;
            v.hasOwnProperty(e) &&
              r(
                "OVERRIDE_BASE" === n,
                "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",
                e
              ),
              t &&
                r(
                  "DEFINE_MANY" === n || "DEFINE_MANY_MERGED" === n,
                  "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",
                  e
                );
          }
          function h(t, n) {
            if (n) {
              r(
                "function" != typeof n,
                "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."
              ),
                r(
                  !e(n),
                  "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object."
                );
              var o = t.prototype,
                i = o.__reactAutoBindPairs;
              for (var c in (n.hasOwnProperty(s) && u.mixins(t, n.mixins), n))
                if (n.hasOwnProperty(c) && c !== s) {
                  var l = n[c],
                    h = o.hasOwnProperty(c);
                  if ((p(h, c), u.hasOwnProperty(c))) u[c](t, l);
                  else {
                    var f = a.hasOwnProperty(c);
                    if ("function" != typeof l || f || h || !1 === n.autobind)
                      if (h) {
                        var m = a[c];
                        r(
                          f &&
                            ("DEFINE_MANY_MERGED" === m || "DEFINE_MANY" === m),
                          "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",
                          m,
                          c
                        ),
                          "DEFINE_MANY_MERGED" === m
                            ? (o[c] = d(o[c], l))
                            : "DEFINE_MANY" === m && (o[c] = y(o[c], l));
                      } else o[c] = l;
                    else i.push(c, l), (o[c] = l);
                  }
                }
            }
          }
          function f(t, e) {
            for (var n in (r(
              t && e && "object" == typeof t && "object" == typeof e,
              "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."
            ),
            e))
              e.hasOwnProperty(n) &&
                (r(
                  void 0 === t[n],
                  "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",
                  n
                ),
                (t[n] = e[n]));
            return t;
          }
          function d(t, e) {
            return function () {
              var n = t.apply(this, arguments),
                o = e.apply(this, arguments);
              if (null == n) return o;
              if (null == o) return n;
              var i = {};
              return f(i, n), f(i, o), i;
            };
          }
          function y(t, e) {
            return function () {
              t.apply(this, arguments), e.apply(this, arguments);
            };
          }
          function m(t, e) {
            return e.bind(t);
          }
          var b = {
              componentDidMount: function () {
                this.__isMounted = !0;
              }
            },
            g = {
              componentWillUnmount: function () {
                this.__isMounted = !1;
              }
            },
            v = {
              replaceState: function (t, e) {
                this.updater.enqueueReplaceState(this, t, e);
              },
              isMounted: function () {
                return !!this.__isMounted;
              }
            },
            E = function () {};
          return (
            o(E.prototype, t.prototype, v),
            function (t) {
              var e = function (t, o, s) {
                this.__reactAutoBindPairs.length &&
                  (function (t) {
                    for (
                      var e = t.__reactAutoBindPairs, n = 0;
                      n < e.length;
                      n += 2
                    ) {
                      var o = e[n],
                        i = e[n + 1];
                      t[o] = m(t, i);
                    }
                  })(this),
                  (this.props = t),
                  (this.context = o),
                  (this.refs = i),
                  (this.updater = s || n),
                  (this.state = null);
                var c = this.getInitialState ? this.getInitialState() : null;
                r(
                  "object" == typeof c && !Array.isArray(c),
                  "%s.getInitialState(): must return an object or null",
                  e.displayName || "ReactCompositeComponent"
                ),
                  (this.state = c);
              };
              for (var o in ((e.prototype = new E()),
              (e.prototype.constructor = e),
              (e.prototype.__reactAutoBindPairs = []),
              c.forEach(h.bind(null, e)),
              h(e, b),
              h(e, t),
              h(e, g),
              e.getDefaultProps && (e.defaultProps = e.getDefaultProps()),
              r(
                e.prototype.render,
                "createClass(...): Class specification must implement a `render` method."
              ),
              a))
                e.prototype[o] || (e.prototype[o] = null);
              return e;
            }
          );
        };
      }
    }
  ]);
  