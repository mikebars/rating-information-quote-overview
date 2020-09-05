# [image]

ARG NODE_VERSION=14.8.0

ARG VARIANT=stretch

FROM node:${NODE_VERSION}-${VARIANT}

# Upgrade yarn

ARG YARN_VERSION=1.22.4

RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz

# Install zsh

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get --assume-yes install --no-install-recommends \
    # <your-package-list-here>
    zsh

# Install oh-my-zsh

ARG OH_MY_ZSH_PLUGINS=(git)

ARG OH_MY_ZSH_THEME="robbyrussell"

ARG USER=node

USER ${USER}

RUN git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && sed --in-place "s/plugins=(git)/plugins=${OH_MY_ZSH_PLUGINS}/g" ~/.zshrc \
    && sed --in-place "s/ZSH_THEME=\"robbyrussell\"/ZSH_THEME=\"${OH_MY_ZSH_THEME}\"/g" ~/.zshrc
